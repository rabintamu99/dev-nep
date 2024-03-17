
import { db } from '@/lib/db'
import Link from 'next/link'
import { UserAvatar } from '@/components/UserAvatar'
import { UserIcon } from 'lucide-react';

const TopUser = async () => {
  const Users = await db.user.findMany({
    include: {
      _count: {
        select: { Post: true }, // Aggregate function to count posts
      },
    },
  });
  return (
<div>
 
<div className='overflow-hidden mt-2 rounded-lg border border-gray-200'>
        <div className='bg-emerald-0 px-2 py-2'>
          <p className='font-semibold py-3 px-2 flex items-center gap-1.5'>
            <UserIcon className='h-4 w-4' />
            Top Contributors
          </p>
  <ul>
    {Users.map((user, index) => (
     <li key={user.id} className='text-zinc-900 dark:text-white text-xl px-2 py-2 rounded-sm hover:bg-slate-100'>
     <div className='flex items-center justify-between'>
       <div className='flex items-center'>
         <span className='font-medium text-gray-400 mr-2'>{index + 1}</span> {/* Display ranking */}
         <div className='flex flex-col items-start justify-between gap-1.5'>
           <div className='flex items-center '>
             <UserAvatar
               user={{ name: user.name || 'Unnamed User', image: user.image || '/default-avatar.png' }}
               className='h-7 w-7 mx-2'
             />
             <Link href={`/${user.username}`}>
               <div>
                 <p className='text-sm font-medium'>{user.name}</p>
                 <p className='text-sm '> @{user.username}</p>
               </div>
             </Link>
             {/* You can keep other elements like post count here, if you plan to reintroduce it. */}
           </div>
         </div>
       </div>
       <button className='text-sm outline rounded-full p-1'>follow</button> {/* Follow button aligned to the right */}
     </div>
   </li>
   
    ))}
  </ul>
  </div>
        <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
          <div className='flex justify-between gap-x-4 py-3'></div>
        </dl>
     
    </div>
</div>

  
  );
}

export default TopUser
