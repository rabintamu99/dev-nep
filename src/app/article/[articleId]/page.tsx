
import { db } from '@/lib/db';
import { formatTimeToNow } from '@/lib/utils';
import {  CircleEllipsisIcon, CircleFadingPlus, CircleFadingPlusIcon, ReplyIcon, ShareIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserAvatar } from '@/components/UserAvatar';
import LikeButton from '@/components/LikeButton';
import SaveComponent from '@/components/SaveComponent';
import EditorOutput from '@/components/EditorOutput';
import MyCommunities from '@/components/homepage/MyCommunities';
import TopUser from '@/components/homepage/TopUsers';
import FollowButton from '@/components/FollowUnfollowButton';
import FollowUnfollowButton from '@/components/FollowUnfollowButton';
import ArticleComment from '@/components/comments/ArticleComment';
import CreateComment from '@/components/CreateComment';

export default async function ArticlePage({
    params: { articleId },
  }: {
    params: { articleId: string }
  }) {
    
    const article = await db.article.findUnique({
        where: {
            id: articleId,
          },
      include: {
        author: true,
        likes: true,
      },
    });

  return (
    <>
    <div className='h-full flex flex-col gap-3 sm:flex-row items-center sm:items-start justify-between'>

      <div className='sm:w-0 w-full flex-1 p-5  bg-white rounded-sm'>
      <div className="flex items-center">
            <UserAvatar
                user={{ name: article?.author.name || 'Unnamed User', image: article?.author.image || '/default-avatar.png' }}
                className='h-10 w-10 mx-2'
            />
           
            <div>
                <CardTitle>{article?.author.name} <span className='text-zinc-400 text-sm'>@{article?.author.username}</span></CardTitle>
                <CardDescription>posted {formatTimeToNow(article.createdAt)}</CardDescription>
            </div>
            {/* <button  className='outline p-2 rounded-sm ml-4 text-zinc-600 text-sm shadow-md'>Follow</button> */}
            <div className='ml-4'>
              <FollowUnfollowButton targetUserId={article?.authorId}  />
            </div>
       
        </div>
        <div className='my-5 p-5 gap-4'>      
        <h1 className='text-4xl font-semibold mb-5  leading-6 text-gray-900'>
          {article?.title }
        </h1>
        <EditorOutput  content={article?.content} />
        </div>
        <CreateComment />
      </div>
      <div>
      <MyCommunities />
      <TopUser />

      </div>
     
    </div>
  </>

  );
};

