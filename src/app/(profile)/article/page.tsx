// Import necessary modules and components
import { UserAvatar } from "@/components/UserAvatar";
import { db } from '@/lib/db';
import { Badge } from "@/components/ui/badge";
import getUser from "@/lib/getUser";
import { getAuthSession } from '@/lib/auth';
import Sidebar from "@/components/Sidebar";
import FollowUnfollowButton from "@/components/FollowUnfollowButton";

// Define the getServerSideProps function for server-side data fetching
export async function getServerSideProps(context) {
  const { username } = context.params;

  // Fetch user details
  const user = await getUser(username);

  // Fetch session details
  const session = await getAuthSession(context.req);

  // Fetch articles related to the user
  const articles = await db.article.findMany({
    where: { author: { username: username } },
    include: {
      author: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Return all data as props
  return {
    props: { user, session, articles },
  };
}

// Define the profile page component
export default function ProfilePage({ user, session, articles }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-y-4 md:gap-x-6 py-6'>
      {/* Left Sidebar */}
      <div className='md:col-span-2'>
        <Sidebar />
      </div>

      {/* Middle Content */}
      <div className='md:col-span-4'>
        <div className="bg-white p-3 px-5 rounded-lg shadow-md max-w-2xl mx-auto">
          {/* User Info Section */}
          <div className="flex items-center space-x-4">
            <UserAvatar user={{ name: user?.name || 'Unnamed User', image: user?.image || '/default-avatar.png' }} className='h-20 w-20 mx-2' />
            <div className="flex-1 min-w-0">
              <p className="text-xl font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-sm text-gray-500 truncate">@{user?.username}</p>
              <p className="text-sm font-medium text-gray-900 mt-2">{user?.bio}</p>
            </div>
          </div>
          {/* Display Articles */}
          {articles.map(article => (
            <div key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='md:col-span-2'>
        {/* Additional components */}
      </div>
    </div>
  );
}
