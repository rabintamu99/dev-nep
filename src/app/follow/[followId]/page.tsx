
// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState } from 'react';

// export default function FollowPage({ params }) {
//   const { userId } = params;
//   const { data: session } = useSession();
//   const [isFollowing, setIsFollowing] = useState(null);

//   const followUser = async () => {
//     // 'use server';

//     try {
//       // Connect to your database and update the follow relationship
//       // You can use a database library like Prisma or MongoDB client

//       setIsFollowing(true);
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   const unfollowUser = async () => {
//     // 'use server';

//     try {
//       // Connect to your database and remove the follow relationship
//       // You can use a database library like Prisma or MongoDB client

//       setIsFollowing(false);
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//     }
//   };

//   return (
//     <div>
//       {isFollowing === null ? (
//         <p>Loading...</p>
//       ) : isFollowing ? (
//         <button onClick={unfollowUser}>Unfollow</button>
//       ) : (
//         <button onClick={followUser}>Follow</button>
//       )}
//     </div>
//   );
// }