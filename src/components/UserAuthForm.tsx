'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const [isGithubLoading, setIsGithubLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const loginWithGithub = async () => {
    setIsGithubLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Github',
        variant: 'destructive',
      })
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col justify-center', className)} {...props}>
      <Button
        isLoading={isGoogleLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isGoogleLoading || isGithubLoading}>
        {isGoogleLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Continue With Google
      </Button>

      <Button
        isLoading={isGithubLoading}
        type='button'
        size='default'
        className='w-full my-2 outline'
        onClick={loginWithGithub}
        disabled={isGoogleLoading || isGithubLoading}>
        {isGithubLoading ? null : <Icons.github className='h-4 w-4 mr-2' />}
        Continue With Github
      </Button>
    </div>
  )
}

export default UserAuthForm
