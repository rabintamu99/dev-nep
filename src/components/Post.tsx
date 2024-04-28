'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageCircle, MessageSquare, MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef,useState,useEffect } from 'react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
import { UserAvatar } from './UserAvatar'
import ShareButton from './ShareComponent'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  subredditName: string
  currentVote?: PartialVote
  commentAmt: number
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  const postUrl = `/c/${subredditName}/post/${post.id}`;

    const [fullUrl, setFullUrl] = useState('');
  
    useEffect(() => {
      // This code will only run on the client-side
      setFullUrl(window.location.origin + postUrl);
    }, [postUrl]);
  
  return (
    <div className='flex flex-col rounded-sm bg-white dark:bg-slate-600 dark:border-white  shadow-white'>
      <div className='py-4 px-6 flex justify-between'>
      
        <div className='w-0 flex-1'>
          <div className='max-h-50 mt-1 text-xs text-gray-500'>
            <div className='flex justify-start gap-2 items-center'>
              
              <UserAvatar
          user={{ name: post.author.name || null,image: post.author.image || null, }}className='h-8 w-8' /> 
          <a href={`/${post.author.username}`}>
          <span className='text-sm font-semibold text-zinc-500 dark:text-white dark:bg-slate-800'> 
          
          {post.author.name}</span>{' '}
         
              </a>
        
            {subredditName ? (
              <>
               <span>Posted in </span>
                <a
                  className=' text-zinc-900 dark:text-white dark:bg-slate-800 text-sm underline-offset-2'
                  href={`/c/${subredditName}`}>
                  circle/{subredditName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
    
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/c/${subredditName}/post/${post.id}`}>
            <h1 className='text-lg font-semibold py-4 leading-6 text-gray-900 dark:text-white'>
              {post.title}
            </h1>
          </a>

            </div>
      

          <div
            className=' relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}>
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent dark:from-black'></div>
            ) : null}
          </div>
        </div>
      </div>
   
      <div className='flex justify-between bg-gray-80 dark:bg-slate-800 z-20 text-sm px-4  py-4 sm:px-6'>
    <div className='flex items-center'>
    <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />
          <Link
          href={`/c/${subredditName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessagesSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
    </div>
        {/* <ShareButton
                title={post.title}
                text={String(post.content)}  
                url={fullUrl}
            /> */}
      </div>
    </div>
  )
}
export default Post
