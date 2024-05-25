"use client";
import { useRef } from 'react';
import { formatTimeToNow } from '@/lib/utils';
import { MessagesSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { UserAvatar } from './UserAvatar';
import LikeComponent from './LikeComponent';
import SaveComponent from './SaveComponent';
import EditorOutput from './EditorOutput';
import ShareComponent from './ShareComponent';
import Tag from './TagComponent';

interface Article {
  id: string;
  title: string;
  content: string | null;
  author: { name: string; username: string; image: string };
  createdAt: Date;
  likes_count: number;
  tags: string[];
}

export interface ArticleProps {
  articles: Article[] | null;  // Changed to expect a single Article object
}

export default function ArticleComponent({ articles }: ArticleProps) {
  const pRef = useRef<HTMLParagraphElement>(null)
  return (
    <>
      {articles && Array.isArray(articles) && articles.length > 0 ? (
        articles.map((article) => (
          <Card key={article.id} className='mb-2'>
            <div className='flex items-center justify-between px-4'>
              <div>
                <a href={`/article/${article.id}`}>
                  <h1 className='text-xl font-semibold pt-4 px-4 leading-6 text-gray-600 dark:text-white'>
                    {article.title}
                  </h1>
                </a>
              </div>
            
              <div className='px-1'>
                {/* @ts-expect-error server component */}
                <SaveComponent />
              </div>
              
            </div>
            <div className="px-6 pt-2">
               {article.tags?.map(tag => <Tag key={tag} tag={tag} />)}
              </div>
            <CardHeader className='flex px-4'>
              <div className="flex items-center justify-between">
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
              </div>
            </CardHeader>
            <CardContent className='relative text-sm max-h-40 w-full overflow-clip' ref={pRef}>
              <a href={`/article/${article.id}`}>
                <EditorOutput content={article.content} />
                {pRef.current?.clientHeight === 160 ? (
                  // blur bottom if content is too long
                  <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent dark:from-black'></div>
                ) : null}
              </a>
            </CardContent>
            <CardFooter className='flex items-center justify-between mt-8 border-t-2 border-zinc-100 pb-2'>
              <div className='flex gap-4 items-center mt-2'>
                <LikeComponent articleId={article.id} initialCount={article.likes_count} />
                <div className='flex gap-1 items-center'><MessagesSquare className='h-4 w-4'/><p>comment</p></div>
              </div>
              <div className='flex  items-center mt-2 '>
                {/* @ts-expect-error server component */}
                <ShareComponent />
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-xl font-bold"></div>
      )}
    </>
  );
}
