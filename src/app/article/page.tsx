
import ArticleFeed from '@/components/ArticleFeed'
import TopArticles from '@/components/homepage/TopArticles'
import Sidebar from '@/components/SidebarComponent'
import TopUser from '@/components/homepage/TopUsers'
import { getAuthSession } from '@/lib/auth'
import Tag from '@/components/homepage/Tag'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Article() {
  const session = await getAuthSession()
  return (
    <>
   
      <div className='grid grid-cols-1 md:grid-cols-8 gap-y-4 md:gap-x-6 py-6'>
     {/* Left Sidebar */}
    <div className='md:col-span-2 hidden md:block'>
     <Sidebar /> 
    </div>

    {/* Middle Content */}
    <div className='md:col-span-4'>
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
