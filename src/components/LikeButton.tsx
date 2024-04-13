"use client";

import React, { useState, useEffect } from "react";
import {HeartIcon} from "lucide-react";

export default function like() {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const toggleLike = (type: number) => {
    if (type === 1) {
      setIsLiked(true);
      setCount(count + 1);
    } else {
      setIsLiked(false);
      setCount(count - 1);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {isLiked ? (
       <HeartIcon onClick={() => toggleLike(0)} className="text-red-500 fill-red-500 " />

      ): (<HeartIcon onClick={() => toggleLike(1)} className="cursor-pointer" />

    )}
    <p>{count}</p>

    </div>
  )
};
