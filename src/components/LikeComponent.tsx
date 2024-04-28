// // "use client";

// // import axios from "axios";
// // import { HeartIcon } from "lucide-react";
// // import { useState } from "react";

// // interface LikeButtonProps {
// //   articleId: string;
// // }

// // const LikeComponent: React.FC<LikeButtonProps> = ({ articleId }) => {
// //   const [liked, setLiked] = useState(false);

// //   const toggleLike = async () => {
// //     try {
// //       const response = await axios.patch('/api/like', { articleId });
// //       if (response.status === 200) {
// //         setLiked(!liked);
// //       }
// //     } catch (error) {
// //       console.error('Error toggling like:', error);
// //     }
// //   };

// //   return (
// //     <button onClick={toggleLike}>
// //       {liked ? (
// //         <HeartIcon className="text-red-500 fill-red-500" />
// //       ) : (
// //         <HeartIcon className="cursor-pointer" />
// //       )}
// //     </button>
// //   );
// // };

// // export default LikeComponent;


// "use client";

// import Article from "@/app/article/page";
// import axios from "axios";
// import { HeartIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import Heart from "react-animated-heart";

// interface LikeButtonProps {
//   articleId: string;
//   count: string;
// }

// const LikeComponent: React.FC<LikeButtonProps> = ({ articleId, count }) => {
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const likedState = localStorage.getItem(`liked-${articleId}`);
//     if (likedState !== null) {
//       setLiked(JSON.parse(likedState));
//     }
//   }, [articleId]);

//   const toggleLike = async () => {
//     try {
//       const response = await axios.patch("/api/like", { articleId });
//       if (response.status === 200) {
//         const newLikedState = !liked;
//         setLiked(newLikedState);
//         localStorage.setItem(`liked-${articleId}`, JSON.stringify(newLikedState));
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   return (
//     <div>
//   {/* <button onClick={toggleLike}>
//       {liked ? (
//         <HeartIcon className="text-red-500 fill-red-500" />
//       ) : (
//         <HeartIcon className="cursor-pointer" />
//       )}
//     </button> */}
//         {liked ? (
//        <HeartIcon onClick={() => toggleLike()} className="text-red-500 fill-red-500 " />

//       ): (<HeartIcon onClick={() => toggleLike()} className="cursor-pointer" />

//     )}
//     </div>
  
    
//   );
// };

// export default LikeComponent;

"use client";

import axios from "axios";
import { HeartIcon } from "lucide-react";
import { useState, useEffect } from "react";


interface LikeButtonProps {
  articleId: string;
  initialCount: number; 
}

const LikeComponent: React.FC<LikeButtonProps> = ({ articleId, initialCount }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialCount);


  useEffect(() => {
    const likedState = localStorage.getItem(`liked-${articleId}`);
    if (likedState !== null) {
      setLiked(JSON.parse(likedState));
    }
  }, [articleId]);

  const toggleLike = async () => {
   
    const newLikedState = !liked;
    const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

    setLiked(newLikedState);
    setLikesCount(newLikesCount);
    localStorage.setItem(`liked-${articleId}`, JSON.stringify(newLikedState));

    try {
      const response = await axios.patch("/api/like", { articleId });
      if (response.status !== 200) {
        // Revert to the previous state if the server doesn't process the like as expected
        setLiked(!newLikedState);
        setLikesCount(likesCount); // Revert the likes count
        localStorage.setItem(`liked-${articleId}`, JSON.stringify(!newLikedState));
      }
    } catch (error) {
      // Revert the like state and count in case of an error
      setLiked(!newLikedState);
      setLikesCount(likesCount);
      localStorage.setItem(`liked-${articleId}`, JSON.stringify(!newLikedState));
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button onClick={toggleLike}>
        <HeartIcon className={`cursor-pointer ${liked ? 'text-red-500 fill-current' : ''}h-5 w-5 `} />
      </button>
      <p>{likesCount}</p>
    </div>
    
  );
};

export default LikeComponent;
