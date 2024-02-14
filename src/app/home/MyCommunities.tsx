import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TentIcon } from 'lucide-react'


const CustomFeed = async () => {
  const session = await getAuthSession()

  // only rendered if session exists, so this will not happen
  if (!session) return notFound()

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  })
  return (
    <div>
      <ul>
         {followedCommunities.map((community) => (
          <li key={community.subreddit.id} className='text-zinc-900 text-xl px-5 py-2 rounded-sm hover:bg-slate-100'>
            <Link href={`/r/${community.subreddit.id}`}>
              <p className='flex items-center gap-1.5'>
                <TentIcon
                  className='h-8 w-8'
                />
                <span>{community.subreddit.name}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
  </div>
  );
}

export default CustomFeed
