"use client"
import { formatTimeToNow } from '@/lib/utils';
import {  Loader2, MessageCircle, MessageCircleIcon, MessageSquareIcon, MessagesSquare, ReplyIcon, ShareIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { UserAvatar } from './UserAvatar';
import LikeComponent from './LikeComponent';
import SaveComponent from './SaveComponent';
import EditorOutput from './EditorOutput';
import ShareComponent from './ShareComponent';


interface Article {
  id: string;
  title: string;
  content: string;
  author: { name: string; username: string; image: string };
  createdAt: Date;
  likes_count: number;
}


export interface ArticleProps {
  articles: Article[] | null;
}

export default function ArticleComponent({ articles }: ArticleProps) {

  return (
    <>
 {articles?.map((article) => (
<Card className='p-3 mb-3'>
<div className='flex items-center justify-between px-6 '>
  <div>
  <a href={`/article/${article.id}`}>
            <h1 className='text-xl font-semibold py-4 leading-6 text-gray-600 dark:text-white'>
              {article.title}
            </h1>
          </a>
  </div>
  <div>
      {/* @ts-expect-error server component */}
        <SaveComponent />
       </div>  
    </div>
   
<CardHeader className='flex  px-4 py-2'>

  <div className="flex items-center justify-between ">
  

  <div className="flex items-center">
 
        <div>
            <UserAvatar
                user={{ name: article.author.name || 'Unnamed User', image: article.author.image || '/default-avatar.png' }}
                className='h-8 w-8 mx-2'
            />
            </div>
            <div>
            <a href={`/${article.author.username}`}>
                <CardTitle className='text-sm'>{article.author.name} <span className='text-zinc-500 text-sm'>@{article.author.username}</span></CardTitle>
                <CardDescription className='text-sm'>posted {formatTimeToNow(article.createdAt)}</CardDescription>
                </a>
            </div>
        </div>
        <div className='flex items-center'>

       </div>   
  </div>
      
    </CardHeader>
  <CardContent className='relative text-sm max-h-40 w-full overflow-clip my-6' >
  <a href={`/article/${article.id}`}>
  <EditorOutput content={article.content} />
    </a>
  </CardContent>
  <CardFooter className='flex items-center justify-between mt-8 border-t-2 border-zinc-100 pb-0'>
   
    <div className='flex gap-4 items-center mt-2 '>
    
      <LikeComponent articleId={article.id} initialCount={article.likes_count} />
      <div className='flex gap-1 items-center'><MessagesSquare className='h-4 w-4'/><p>comment</p></div>
    </div>
    <div className='flex gap-4 items-center mt-2'>
      {/* @ts-expect-error server component */}
     <ShareComponent />
    </div>

  </CardFooter>
</Card>
  ))} 
    </>
  );
}

