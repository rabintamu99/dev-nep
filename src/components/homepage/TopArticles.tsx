
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TrendingUpIcon, UsersIcon } from 'lucide-react'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'


const Community = async () => {
  const session = await getAuthSession()

  // // only rendered if session exists, so this will not happen
  // if (!session) return notFound()

  const article = await db.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },

  })
  return (
<div>
<div className='overflow-hidden h-fit rounded-lg border border-gray-200'>
        <div className='bg-emerald-0 rounded-lg border border-gray-200 px-2 py-2'>
          <p className='font-semibold py-1 px-2 flex items-center gap-1.5'>
            {/* <Users2Icon className='h-4 w-4' /> */}
            <TrendingUpIcon className='h-4 w-4' />Trending Articles
          </p>
  <ul>
    {article.slice(0, 10).map((article, index) => (
      <li key={article.id} className='text-zinc-900 dark:text-white text-xl px-2 py-2 rounded-sm hover:bg-slate-100'>
        <Link href={`/c/${article.id}`}>
          <p className='flex items-center gap-1.5'>
            <span className='font-medium text-gray-400 mr-2'>#{index + 1}</span> {/* Display ranking */}
            {/* <UsersIcon className='h-4 w-4'/> */}
            <span className='font-medium items-center text-sm'>{article.title}</span>
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

export default Community
