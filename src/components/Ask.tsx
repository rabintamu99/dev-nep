
import { db } from '@/lib/db';
import { formatTimeToNow } from '@/lib/utils';
import { addQuestion } from '@/actions/actions';

import PostAsk from './PostAsk';
import { BookmarkIcon, HeartIcon, MessageCircle, MessageCircleIcon, ReplyIcon, Share2Icon, ShareIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { UserAvatar } from './UserAvatar';
import LikeButton from './LikeButton';
import SaveComponent from './SaveComponent';

const Page = async () => {
    const questions = await db.question.findMany({
      orderBy: {
        createdAt: 'desc' // assuming 'createdAt' is the field you want to sort by
      },
      include: {
        author: true,
      },
    });
  return (

    
    <div className="max-w-2xl mx-auto my-7 rounded-lg shadow-md">
 {questions.map((question) => (
<Card className='my-3'>
<CardHeader className='flex justify-between px-4 py-6'>
        <div className="flex items-center">
            <UserAvatar
                user={{ name: question.author.name || 'Unnamed User', image: question.author.image || '/default-avatar.png' }}
                className='h-10 w-10 mx-2'
            />
            <div>
                <CardTitle>{question.author.name} <span className='text-zinc-400 text-sm'>@{question.author.username}</span></CardTitle>
                <CardDescription>posted {formatTimeToNow(question.createdAt)}</CardDescription>
            </div>
        </div>
    </CardHeader>
  <CardContent>
  <a href={`/question/${question.id}`}>
    <p> {question.text}</p>
    </a>
  </CardContent>
  <CardFooter className='justify-between'>
   
    <div className='flex gap-2 items-center'>
      <LikeButton />
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
