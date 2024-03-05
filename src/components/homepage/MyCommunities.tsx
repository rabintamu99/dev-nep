
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

  const subreddit = await db.subreddit.findMany({
  })

  
  
  return (
<div>
  <ul>
    {subreddit.map((subreddit, index) => (
      <li key={subreddit.id} className='text-zinc-900 dark:text-white text-xl px-2 py-2 rounded-sm hover:bg-slate-100'>
        <Link href={`/r/${subreddit.name}`}>
          <p className='flex items-center gap-1.5'>
            <span className='font-medium text-gray-400 mr-2'>{index + 1}<TrendingUpIcon className='h-4 w-4' /></span> {/* Display ranking */}
            {/* <UsersIcon className='h-4 w-4'/> */}
            <span className=' font-medium text-lg text-right'>{subreddit.name}</span>
          </p>
      
        </Link>
   
      </li>
    ))}
  </ul>
</div>

  );
}

export default Community
