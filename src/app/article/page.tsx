
import ArticleFeed from '@/components/ArticleFeed'
import TopArticles from '@/components/homepage/TopArticles'
import Sidebar from '@/components/SidebarComponent'
import TopUser from '@/components/homepage/TopUsers'
import { getAuthSession } from '@/lib/auth'
import Tag from '@/components/homepage/Tag'
import Link from 'next/link'
import { HomeIcon, ShieldQuestion, TrendingUpIcon } from 'lucide-react'
import TopicSection from '@/components/TopicSection'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Article() {
  const session = await getAuthSession()
  return (
    <>
    <div className='flex flex-col md:col-span-6  overflow-x-auto whitespace-nowrap no-scrollbar'>
     <TopicSection />
    </div>
    <div className='grid grid-cols-1 md:grid-cols-8 gap-y-4 md:gap-x-6 py-3'>
     
     {/* Left Sidebar */}
    {/* <div className='md:col-span-2 hidden md:block'>
     <Sidebar /> 
    </div> */}
    
    {/* Middle Content */}
    <div className='md:col-span-6'>
 
  <ArticleFeed />
     
    </div>

    {/* Right Sidebar */}
    <div className='md:col-span-2  hidden md:block'>
    
          {/* @ts-expect-error server component */}
          <TopArticles />


           {/* @ts-expect-error server component */}
          <Tag />
      
  </div>
  </div>
    </>
  )
}
