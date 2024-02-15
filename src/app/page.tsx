
import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import MyCommunities from '@/components/homepage/MyCommunities'
import TopUser from '@/components/homepage/TopUsers'
import { buttonVariants } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import { HomeIcon, Mail, MessageCircle, MessageCircleIcon, ShieldQuestion, Tent as TentIcon, TrendingUpIcon, UserIcon, Users2Icon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()
  return (
    <>
      {/* <h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1> */}
      <div className='flex items-center gap-2'>
      <Link className="bg-white text-gray-500 border  rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all " href={`/`}>
           <HomeIcon className="mr-2 h-4 w-4" />
           <span>Feed</span>
      </Link>
      <Link className="bg-white text-black border border-gray-300 shadow-sm rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all" href={`/trend`}>
            <TrendingUpIcon className="mr-2 h-4 w-4" />
           <span>Trend</span>
      </Link>
      <Link className="bg-white text-black border border-gray-300 shadow-sm rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all" href={`/`}>
            <ShieldQuestion className="mr-2 h-4 w-4" />
           <span>Ask</span>
      </Link>
    
      </div>
    
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
       {/* @ts-expect-error server component */}
       {session ? <CustomFeed /> : <GeneralFeed />}

        {/* subreddit info */}
        <div className='overflow-hidden h-fit rounded-lg order-first md:order-last'>
          <div className='bg-emerald-0  rounded-lg border border-gray-200 px-2 py-2'>
            <p className='font-semibold py-1 px-2 flex items-center gap-1.5'>
              {/* <Users2Icon className='h-4 w-4' /> */}
              Trending Communities
            </p>
          
            {/* <MyCommunities /> */}
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-1 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
            </div>
            {/* <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href={`/r/create`}>
              Create Community
            </Link> */}
          </dl>
       
        <div className='overflow-hidden rounded-lg border border-gray-200 order-first md:order-last'>
          <div className='bg-emerald-0 px-2 py-2'>
            <p className='font-semibold py-3 px-2 flex items-center gap-1.5'>
              <UserIcon className='h-4 w-4' />
              Top Contributors
            </p>
           
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
            </div>
          </dl>
        </div>
        </div>
        </div>
    </>
  )
}
