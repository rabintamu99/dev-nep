
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'
import { BellIcon, CalendarPlusIcon, DogIcon, HeartHandshakeIcon, MoonIcon } from 'lucide-react'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between px-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className=' text-zinc-700 text-md font-bold md:block'>NEP.DEV</p>
        </Link>

      
        <div className='flex items-center'>
          <Link href='/' className='flex mr-4 items-center'>
          <p className='hidden hover:text-slate-950 text-zinc-700 text-md font-medium md:block'>Events</p>
        </Link>
        <Link href='/' className='flex gap-2 items-center'>
          <p className='hidden text-zinc-700 text-md font-medium md:block'>Jobs</p>
        </Link>
        </div>
        {/* search bar */}
        <SearchBar />
        <div className=' flex gap-2 items-center'>
        <BellIcon className='flex hidden mr-4 items-center md:block'/>
        <MoonIcon className='flex  hidden mr-4 items-center md:block' />
           {/* actions */}
           {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
