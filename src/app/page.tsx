
import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import MyCommunities from '@/components/homepage/MyCommunities'
import Sidebar from '@/components/Sidebar'
import TopUser from '@/components/homepage/TopUsers'
import { getAuthSession } from '@/lib/auth'
import { HomeIcon, ShieldQuestion, TrendingUpIcon, UserIcon } from 'lucide-react'

import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()
  return (
    <>
   
      <div className='grid grid-cols-1 md:grid-cols-8 gap-y-4 md:gap-x-6 py-6'>
     {/* Left Sidebar */}
    <div className='md:col-span-2'>
    
          <Sidebar />
       
    </div>

    {/* Middle Content */}
    <div className='md:col-span-4'>
    {/* <div className='flex items-center gap-2 mb-2'>
      <Link className="bg-white text-gray-500 border  rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all " href={`/`}>
           <HomeIcon className="mr-2 h-4 w-4" />
           <span>Feed</span>
      </Link>
      <Link className="bg-white text-black border border-gray-300 shadow-sm rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all" href={`/trend`}>
            <TrendingUpIcon className="mr-2 h-4 w-4" />
           <span>Trend</span>
      </Link>
      <Link className="bg-white text-black border border-gray-300 shadow-sm rounded-full flex items-center px-3 py-1 hover:shadow-lg active:shadow-sm transition-all" href={`/ask`}>
            <ShieldQuestion className="mr-2 h-4 w-4" />
           <span>Ask</span>
      </Link>
      </div> */}
  {/* @ts-expect-error server component */}
  {session ? <CustomFeed /> : <GeneralFeed />}
     
    </div>

    {/* Right Sidebar */}
    <div className='md:col-span-2'>
    
          {/* @ts-expect-error server component */}
          <MyCommunities />
     

          {/* @ts-expect-error server component */}
          <TopUser />
      
  </div>
  </div>
    </>
  )
}
