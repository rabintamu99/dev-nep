'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageCircle, MessageSquare, MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
import { UserAvatar } from './UserAvatar'
import ShareComponent from './ShareComponent'

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

  return (
    <div className='flex flex-col  rounded-sm bg-white dark:bg-slate-600 dark:border-white  shadow-white'>
      <div className='px-2 py-4 flex justify-between'>
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />

        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500'>

         
            {subredditName ? (
              <>
               <UserAvatar
          user={{ name: post.author.name || null,image: post.author.image || null, }}className='h-4 w-4' /> 
                <a
                  className='underline text-zinc-900 dark:text-white dark:bg-slate-800 text-sm underline-offset-2'
                  href={`/r/${subredditName}`}>
                  circle/{subredditName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
    
         <span className='px-1'>Posted by </span>
       
         <span> 
          
             {post.author.name}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900 dark:text-white'>
              {post.title}
            </h1>
          </a>

          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
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
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessagesSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
        <ShareComponent />
      </div>
    </div>
  )
}
export default Post
