import { UserAvatar } from "@/components/UserAvatar";
import { db } from '@/lib/db';
import { Badge } from "@/components/ui/badge"
import getUser from "@/lib/getUser";
import { ClockIcon } from "lucide-react";
import { getAuthSession } from '@/lib/auth';
import FollowUnfollowButton from "@/components/FollowUnfollowButton";
import ArticleComponent from "@/components/Article";
import TabSection from "@/components/TabSection"; 
import { FaLink } from "react-icons/fa";

export default async function ProfilePage({
  params: { username },
  
}: {
  params: { username: string }
}) {

  const user = await getUser(username);
  const session = await getAuthSession();

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

  const totalArticles = await db.article.count({
    where: { author: { username: username } }
  });

  const totalFollowers = await db.user.count({
    where: { following: { some: { followerId: user?.id } } }
  });

  const totalSubscriptions = await db.user.count({
    where: { id: user?.id }
  });

  const totalLikes = await db.like.count({
    where: {
      article: {
        authorId: user?.id,
      }
    }
  });

  return (
    <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-12 gap-y-4 md:gap-x-6 py-6">
      {/* Profile Section */}
      <div className="md:col-span-12 bg-zinc-50 p-3 shadow-sm rounded-sm">
        <div className="max-w-4xl mx-auto p-3 px-5 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <UserAvatar
                user={{ name: user?.name || 'Unnamed User', image: user?.image || '/default-avatar.png' }}
                className='h-20 w-20 mx-2'
              />
              <ClockIcon className="absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-sm text-gray-500 truncate">@{user?.username}</p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                {user?.bio}
              </p>
              <div className="flex mt-4 items-center gap-1 space-x-6">
            <p className="text-l font-bold">{totalSubscriptions} <span className="text-sm text-zinc-500 font-semibold">Circle</span></p>
            <p className="text-l font-bold">{totalFollowers} <span className="text-sm text-zinc-500 font-semibold">Followers</span></p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="h-5 w-5">Skill</Badge>
          </div>
            </div>
            <div className="flex items-center justify-center mx-5 space-x-4">
      <a href="/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      </a>
      <a href="/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      </a>
      <a href="/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-700">
        <FaLink className="text-zinc-500 hover:text-zinc-700" />
      </a>
    </div>
            {session?.user && session.user.id !== user?.id && (
              <FollowUnfollowButton targetUserId={user?.id} />
            )}
          </div>
         
          {/* <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <p className="text-l text-gray-500 font-bold">Articles</p>
              <p className="text-l text-gray-500 font-bold">{totalArticles}</p>
            </div>
            <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <p className="text-l text-gray-500 font-bold">Likes</p>
              <p className="text-l text-gray-500 font-bold">{totalLikes}</p>
            </div>
            <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <p className="text-l text-gray-500 font-bold">Saved</p>
              <p className="text-l text-gray-500 font-bold">3</p>
            </div>
          </div> */}
              {/* Articles Section */}
      <div className="md:col-span-12">
        <div className="max-h-[calc(100vh-8rem)] p-3">
          <div className="max-w-4xl mx-auto">
          <TabSection
              articles={articles}
              totalArticles={totalArticles}
              totalLikes={totalLikes}
            />
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
