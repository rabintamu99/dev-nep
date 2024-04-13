// "use client";

// import React, { useState, useEffect } from "react";
// import {BookmarkIcon, HeartIcon} from "lucide-react";

// export default function save() {
//   const [isLiked, setIsLiked] = useState(false);
//   const [count, setCount] = useState(0);
//   const toggleLike = (type: number) => {
//     if (type === 1) {
//       setIsLiked(true);
//       setCount(count + 1);
//     } else {
//       setIsLiked(false);
//       setCount(count - 1);
//     }
//   };

//   return (
//     <div className="flex gap-2 items-center">
//       {isLiked ? (
//        <BookmarkIcon onClick={() => toggleLike(0)} className="text-red-500 fill-red-500 " />

//       ): (<BookmarkIcon onClick={() => toggleLike(1)} className="cursor-pointer" />

//     )}
//     <p>{count}</p>

//     </div>
//   )
// };


'use client'
import axios from 'axios'
import { BookmarkCheckIcon, BookmarkIcon, StarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    questionId:string
    SavedStatus:boolean
}

const SaveComponent = ({questionId, SavedStatus}: Props) => {
    const [currentSavedStatus, setCurrentSavedStatus] = useState<boolean>(SavedStatus)

    const SaveStory = async () => {
        setCurrentSavedStatus(!currentSavedStatus)
        try {
            await axios.post('/api/save',{
              questionId
            })
        } catch (error) {
            console.log('Error while saving')
            setCurrentSavedStatus(!currentSavedStatus)
        }
    }

    useEffect(() => {
        setCurrentSavedStatus(SavedStatus)
    },[SavedStatus])

  return (
    <button onClick={(e) => {e.preventDefault(); SaveStory()}} className='flex items-center '>
        {currentSavedStatus ? (
            
            <BookmarkIcon className='text-zinc-500 fill-zinc-500 h-7 w-7' />
            // <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z" fill="#000"></path></svg>
        ):(
            <BookmarkIcon className='text-zinc-500 h-7 w-7'  />
        // <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path></svg>
        )}
    </button>
  )
}

export default SaveComponent