import { redirect } from 'next/navigation'
import SidebarNav  from '@/components/setting/SidebarNav'
import { UserNameForm } from '@/components/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/Button'


export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div className='max-w-5xl grid grid-cols-4 mx-auto py-12'>
      <SidebarNav />
      <div className='grid cols-span-1 items-start gap-8'>
        <h1 className='font-bold text-3xl md:text-4xl'>edit profile</h1>

        <div className='grid col-span-3 gap-10'>
          <div className='flex gap-4'>
          <UserAvatar
          user={{
            name: session.user.name || null,
            image: session.user.image || null,
          }}
          className='h-20  w-20'
        />
        <p className='font-medium text-xl md:text-xl'>change profile picture</p>
          </div>
       
          <UserNameForm
            user={{
              id: session.user.id,
              username: session.user.username || '',
              name: session.user.name || '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
