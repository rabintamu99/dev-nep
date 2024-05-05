import  ArticleEditor  from '@/components/ArticleEditor'
import { Button } from '@/components/ui/Button'
import React from 'react'

const page = () => {

    return (
    <div className='flex flex-col-1 items-start gap-6'>
    {/* heading */}
    <div className='border-b border-gray-200 pb-5'>
      <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
        <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
         
        </h3>
        <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
          
        </p>
      </div>
    </div>

    {/* form */}
    <ArticleEditor />

    <div className='w-1/4 grid items-center my-2 gap-2'>
    <Button type='submit' variant={'outline'} className='w-full' form='subreddit-post-form'>
        Save Draft 
      </Button>
      <Button type='submit' className='w-full' form='subreddit-post-form'>
        Post Article
      </Button>
    </div>
  </div>
)
}

export default page