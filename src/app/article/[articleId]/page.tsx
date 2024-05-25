import { db } from '@/lib/db';
import { CardDescription, CardTitle } from '@/components/ui/Card';
import { UserAvatar } from '@/components/UserAvatar';
import EditorOutput from '@/components/EditorOutput';
import FollowUnfollowButton from '@/components/FollowUnfollowButton';
import CreateComment from '@/components/CreateComment';
import { getAuthSession } from '@/lib/auth';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import Tag from '@/components/TagComponent';


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
        tags: true,
      },
    });

    
     // Ensuring article exists and formatting the date
const formattedDate = article ? format(new Date(article.createdAt), 'yyyy MMMM dd') : 'Date unavailable';



  return (
    <>
    <div className='h-full w-1/2 mx-auto mb-5 items-center flex flex-col gap-3 sm:flex-row sm:items-start justify-between'>

      <div className='sm:w-0 w-full flex-1 p-5 rounded-sm'>
      <h1 className='text-3xl font-semibold mb-5 text-left text-gray-900'>
          {article?.title }
        </h1>
        <h1 className='border-t-2 text-zinc-500'></h1>

      <div className="flex mt-5 items-center">
            <UserAvatar
                user={{ name: article?.author.name || 'Unnamed User', image: article?.author.image || '/default-avatar.png' }}
                className='h-10 w-10 mx-4'
            />
           
            <div>
                <CardTitle>{article?.author.name} <span className='text-zinc-400 text-sm'>@{article?.author.username}</span></CardTitle>
                <CardDescription>Published {formattedDate}</CardDescription>
            </div>

            {/* <button  className='outline p-2 rounded-sm ml-4 text-zinc-600 text-sm shadow-md'>Follow</button> */}
            <div className='ml-4 mr-5'>
            {session?.user && session.user.id !== article?.authorId && (
             <FollowUnfollowButton targetUserId={article?.authorId} />)}
            </div>
            <Button className='p-2 h-auto w-auto rounded-full mr-10 gap-1' variant={'outline'}>Send
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
               <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 
               1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.
               166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
               <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
             </svg>
            </Button>
        </div>
        <span className='h-1 w-1 rounded-full bg-zinc-800' />
        {/* <div>
            <p>Estimated reading time: {calculateReadingTime(article?.content)} minutes</p>
          </div> */}
        <div className='my-2 p-5 gap-4'>      
        <div className="pt-2">
         {article?.tags?.map(tag => (
           <Tag key={tag.id} tag={tag.name} />
          ))}
        </div>
        <EditorOutput  content={article?.content} />
        </div>


     {/* @ts-expect-error server component */}
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

