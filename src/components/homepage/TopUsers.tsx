
import { db } from '@/lib/db'
import Link from 'next/link'
import { UserAvatar } from '@/components/UserAvatar'

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
     <ul>
        {Users.map((user) => (
        <li key={user.id} className='text-zinc-900 text-xl px-2 rounded-sm hover:bg-slate-100'>
        <Link href={`/u/${user.username}`}>
          <div className='flex flex-col items-start gap-1.5'>
            <div className='flex items-center '>
              <UserAvatar
                user={{ name: user.name || 'Unnamed User', image: user.image || '/default-avatar.png' }}
                className='h-7 w-7 mx-2'
              />
              <div>
              <p className='text-sm font-medium'>{user.name}</p>
              <p className='text-sm'> {user._count.Post} Posts</p>
              </div>
             
            </div>
            
          </div>
        </Link>
      </li>
      
        ))}
      </ul>
  </div>
  
  );
}

export default TopUser
