
import { db } from '@/lib/db';
import { formatTimeToNow } from '@/lib/utils';
import {  ReplyIcon, ShareIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { UserAvatar } from './UserAvatar';
import LikeComponent from './LikeComponent';
import SaveComponent from './SaveComponent';
import EditorOutput from './EditorOutput';

const Page = async () => {
    const article = await db.article.findMany({
      orderBy: {
        createdAt: 'desc' // assuming 'createdAt' is the field you want to sort by
      },
      include: {
        author: true,
        likes: true,
      },
    });
  return (
   <div className="max-w-2xl mx-auto  rounded-lg">
 {article.map((article) => (
<Card className='p-3 mb-5'>
<CardHeader className='flex justify-between px-4 py-2'>
        <div className="flex items-center">
            <UserAvatar
                user={{ name: article.author.name || 'Unnamed User', image: article.author.image || '/default-avatar.png' }}
                className='h-10 w-10 mx-2'
            />
            <div>
                <CardTitle>{article.author.name} <span className='text-zinc-400 text-sm'>@{article.author.username}</span></CardTitle>
                <CardDescription>posted {formatTimeToNow(article.createdAt)}</CardDescription>
            </div>
        </div>
    </CardHeader>
  <CardContent className='relative text-sm max-h-40 w-full overflow-clip my-6' >
  <a href={`/article/${article.id}`}>
  <EditorOutput content={article.content} />
    </a>
  </CardContent>
  <CardFooter className='justify-between'>
   
    <div className='flex gap-2 items-center'>
    
      <LikeComponent articleId={article.id} initialCount={article.likes_count} />
      <ReplyIcon className='h-7 w-7 p-1 bg-zinc-100 rounded-full'/>
    <p> answer</p>
    </div>
    <div className='flex gap-4 items-center'>
        {/* @ts-expect-error server component */}
     <SaveComponent />
     <ShareIcon />
    </div>

  </CardFooter>
</Card>

  ))}
</div>

  );
};

export default Page;
