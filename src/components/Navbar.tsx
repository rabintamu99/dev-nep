import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Icons } from './Icons';
import { Button, buttonVariants } from './ui/Button';
import { UserAccountNav } from './UserAccountNav';
import SearchBar from './SearchBar';
import { ModeToggle } from '@/components/ModeToggle';
import { BellIcon, PenBoxIcon, MenuIcon } from 'lucide-react';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='fixed top-0 inset-x-0 bg-zinc-100 dark:bg-slate-800 border-b border-zinc-300 z-[50] py-2'>
     <div className='container max-w-7xl h-full mx-auto flex items-center justify-between'>
        {/* Logo and toggle menu button */}
        <div className='flex items-center'>
          <Button className='md:hidden mr-2' aria-label='Menu' variant={'outline'} >
            <MenuIcon className='h-6 w-6' />
          </Button>
          <Link href='/' className='flex gap-1 items-center'>
            <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
            <span className='hidden md:block text-zinc-800 text-xl font-bold'>NEP.DEV</span>
          </Link>
        </div>
        
  
       {/* Responsive Centered Search Bar */}
    <div className='flex justify-center items-center w-full'>
      <div className='w-full max-w-lg px-4 mr-1 md:px-0'>
      <SearchBar />
      </div>
    </div>

        {/* Right section with conditional display */}
        <div className='flex gap-3 items-center'>
          <Link href='/article/create' className='md:flex hover:bg-zinc-200 hover:rounded-full p-1 '>
            <PenBoxIcon className='h-6 w-6 mr-1 ' /> <span>write</span>
          </Link>
          <div className='hidden md:flex gap-4 items-center'>
            <BellIcon className='h-8 w-8 hover:bg-zinc-200 hover:rounded-full p-1' />
            <ModeToggle  />
            {/* Conditional rendering based on session */}
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <Link href='/sign-in' style={{ width: '70px' }} className={buttonVariants()}>
              Sign In
            </Link>
            
            )}
          </div>
          {/* Sign in button for mobile */}
          {!session?.user && (
            <Link href='/sign-in' style={{ width: '70px'}} className='md:hidden'>
              <Button variant='outline'>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
