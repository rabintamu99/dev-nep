import { db } from '@/lib/db';
import { CardDescription, CardTitle } from '@/components/ui/Card';
import { UserAvatar } from '@/components/UserAvatar';
import EditorOutput from '@/components/EditorOutput';
import FollowUnfollowButton from '@/components/FollowUnfollowButton';
import CreateComment from '@/components/CreateComment';
import { getAuthSession } from '@/lib/auth';
import { format } from 'date-fns';


export default async function ArticlePage({
    params: { articleId },
  }: {
    params: { articleId: string }
  }) {

    const session = await getAuthSession();
    
    const article = await db.article.findUnique({
        where: {
            id: articleId,
          },
      include: {
        author: true,
        likes: true,
      },
    });

    
     // Ensuring article exists and formatting the date
const formattedDate = article ? format(new Date(article.createdAt), 'yyyy MMMM dd') : 'Date unavailable';



  return (
    <>
    <div className='h-full w-3/4 mx-auto mb-5 items-center flex flex-col gap-3 sm:flex-row sm:items-start justify-between'>

      <div className='sm:w-0 w-full flex-1 p-5  bg-white rounded-sm'>
      <h1 className='text-3xl font-semibold mb-5 text-center text-gray-900'>
          {article?.title }
        </h1>
      <div className="flex items-center">
    
            <UserAvatar
                user={{ name: article?.author.name || 'Unnamed User', image: article?.author.image || '/default-avatar.png' }}
                className='h-10 w-10 mx-4'
            />
           
            <div>
                <CardTitle>{article?.author.name} <span className='text-zinc-400 text-sm'>@{article?.author.username}</span></CardTitle>
                <CardDescription>Published {formattedDate}</CardDescription>
            </div>

            {/* <button  className='outline p-2 rounded-sm ml-4 text-zinc-600 text-sm shadow-md'>Follow</button> */}
            <div className='ml-4'>
            {session?.user && session.user.id !== article?.authorId && (
             <FollowUnfollowButton targetUserId={article?.authorId} />)}
            </div>
        </div>
        <span className='h-1 w-1 rounded-full bg-zinc-800' />
        {/* <div>
            <p>Estimated reading time: {calculateReadingTime(article?.content)} minutes</p>
          </div> */}
        <div className='my-5 p-5 gap-4'>      
      
        <EditorOutput  content={article?.content} />
        </div>
        <CreateComment />
      </div>
      <div>
      {/*<MyCommunities />
      <TopUser />
      */}
      </div>
     
    </div>
  </>

  );
};

