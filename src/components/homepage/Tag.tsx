
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TagIcon, TagsIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'
import { FaHashtag, FaTag } from 'react-icons/fa'


const Tag = async () => {
  const session = await getAuthSession()

  // // only rendered if session exists, so this will not happen
  // if (!session) return notFound()

  const tags = await db.tag.findMany({

  })
  return (
<div>
<div className='overflow-hidden mt-2 h-fit rounded-lg border border-gray-200'>
        <div className='bg-emerald-0 rounded-lg border border-gray-200 px-2 py-2'>
          <p className='font-semibold py-1 px-2 flex items-center gap-1.5'>
            {/* <Users2Icon className='h-4 w-4' /> */}
            <TrendingUpIcon className='h-4 w-4' />Trending Tags
          </p>
  <ul>
    {tags.slice(0, 10).map((tag, index) => (
      <li key={tag.id} className='text-zinc-900 dark:text-white text-xl px-2 py-2 rounded-sm hover:bg-slate-100'>
        <Link href={`/article/${tag.id}`}>
          <p className='flex items-center gap-1.5'>
            <span className='font-medium text-gray-400 mr-1'><FaHashtag /></span> {/* Display ranking */}
            {/* <UsersIcon className='h-4 w-4'/> */}
            <span className='font-medium items-center text-sm'>{tag.name}</span>
            {/* <span className='text-zinc-400  font-medium text-sm text-right'>{subreddit._count.posts} posts</span>
            <span className='text-zinc-400  font-medium text-sm text-right'>{subreddit._count.subscribers} member</span> */}
          </p>
        </Link>
      </li>
    ))}
  </ul>
  </div>
</div>
</div>
  );
}

export default Tag
