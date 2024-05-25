'use client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/hooks/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Icons } from '@/components/Icons'
import { Description } from '@radix-ui/react-toast'

const Page = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [about, setAbout] = useState<string>('')
  const { loginToast } = useCustomToasts()

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: name,
        about: about,
      }

      const { data } = await axios.post('/api/circle', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Circle already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid circle name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create circle.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      router.push(`/c/${data}`)
    },
  })

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white w-full h-full p-4 my-10 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Circle</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <h2 className='text-lg font-medium'>Introduction</h2>
          <p className='text-sm pb-4'>
            Welcome to the Circle Creation page! Here, you can create a new circle to share and discuss learning experiences with other members of the community. A circle is a group where you can post updates, share resources, and engage in meaningful discussions.
          </p>
          <h2 className='text-lg font-medium'>Guidelines</h2>
          <ul className='list-disc list-inside text-sm space-y-2 pb-4'>
            <li>Choose a unique and descriptive name for your circle.</li>
            <li>Provide a clear and concise description of the circle's purpose and goals.</li>
            <li>Maintain respectful and constructive communication within the circle.</li>
            <li>Ensure all content shared adheres to community standards and guidelines.</li>
            <li>Regularly engage with circle members to foster a collaborative environment.</li>
          </ul>
        </div>

        <hr className='bg-gray-300 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Circle names, including capitalization, cannot be changed.
          </p>
          <div className='relative'>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>
        <div>
          <p className='text-lg font-medium'>Description</p>
          <p className='text-xs pb-2'>
            Short description about the circle.
          </p>
          <div className='relative'>
            <Input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            disabled={isLoading}
            variant='subtle'
            onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={name.length === 0}
            onClick={() => createCommunity()}>
            Create Circle
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
