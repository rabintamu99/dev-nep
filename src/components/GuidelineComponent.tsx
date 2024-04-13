
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import Link from 'next/link'
import { TrendingUpIcon, UsersIcon } from 'lucide-react'

const Guideline = async () => {
  
  return (
<div>
<div className='overflow-hidden h-fit rounded-lg border border-gray-200'>
        <div className='bg-emerald-0 rounded-lg border border-gray-200 px-2 py-2'>
          <p className='font-semibold py-1 px-2 flex items-center gap-1.5'>
            {/* <Users2Icon className='h-4 w-4' /> */}
            <TrendingUpIcon className='h-4 w-4' />Trending Circle
          </p>
          <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>

  </div>
</div>
</div>
  );
}

export default Guideline
