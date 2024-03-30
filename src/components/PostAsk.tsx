"use client";

import { addQuestion } from '@/actions/actions';
import { useRef } from "react";
import { UserAvatar } from './UserAvatar'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { getAuthSession } from '@/lib/auth'
import { PlusIcon } from 'lucide-react';


const Page = async () => {
  const ref = useRef<HTMLFormElement>(null)


  return (
    <form className="flex items-center mt-4"  ref={ref}
      action={async (formData) => {
        await addQuestion(formData)
        ref.current?.reset()
      }}>

<div className='grid w-full'>
    <Label htmlFor='comment'>Having a problem? Ask our experts.</Label>
    <div className='mt-4 rounded-full flex items-center justify-between'>
        <Input
            id='comment'
            name='text'
            placeholder='What are your thoughts?'
            required
            className="text-lg bg-white rounded-full font-sm"
            
        />
        <Button type='submit' className="bg-zinc-600 text-white rounded-full">
            <PlusIcon className="h-6 w-6" />
        </Button>
    </div>
</div>

    
  </form>
  );
};

export default Page;



<div className="max-w-3xl mx-auto mt-4 p-4 bg-white rounded-full shadow flex items-center justify-between">

</div>