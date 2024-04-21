
import { UserAvatar } from "@/components/UserAvatar";
import { db } from '@/lib/db';
import { Badge } from "@/components/ui/badge"
import getUser from "@/lib/getUser";
import { CalendarIcon, CheckCircle2Icon, CircleDashed, ClockIcon, ExternalLinkIcon, GithubIcon, LinkedinIcon, LocateIcon, LucideGithub, MapPinIcon, PlayIcon, SmileIcon, TicketCheckIcon, TwitterIcon, XIcon } from "lucide-react";

import { getAuthSession } from '@/lib/auth';
import { Button } from "@/components/ui/Button";
import Sidebar from "@/components/Sidebar";
import ProfileComponent from "@/components/ProfileComponent";
import MyCommunities from "@/components/homepage/MyCommunities";
import TopUser from "@/components/homepage/TopUsers";
import FollowUnfollowButton from "@/components/FollowUnfollowButton";
import { Session } from "inspector";
import * as Tabs from '@radix-ui/react-tabs';
import ArticleComponent from "@/components/Article";
export default async function profilePage({
  params: { username },
}: {
  params: { username: string }
}) {

 const user = await getUser(username);

 const session = await getAuthSession();

  // Fetch articles related to the user
  const articles = await db.article.findMany({
    where: { author: { username: username } },
    include: {
      author: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(articles);
  // return {
  //   props: { user, session, articles },
  // };


return (
  <>
   
  <div className='grid grid-cols-1 md:grid-cols-8 gap-y-4 md:gap-x-6 py-6'>
 {/* Left Sidebar */}
<div className='md:col-span-2'>

      <Sidebar />
   
</div>

{/* Middle Content */}
<div className='md:col-span-4'>
<div className="bg-white p-3 px-5 rounded-lg shadow-md max-w-2xl mx-auto">
    {/* User Info Section */}
    <div className="flex items-center space-x-4">
          <div className="relative">
          <UserAvatar
          user={{ name: user?.name || 'Unnamed User', image: user?.image || '/default-avatar.png' }}
           className='h-20 w-20 mx-2'
         />
            <ClockIcon className="absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-semibold text-gray-900 truncate">{user?.name }</p>
            <p className="text-sm text-gray-500 truncate">@{user?.username }</p>
            {/* <div className="flex items-center mt-2">
              <Badge variant="secondary"><MapPinIcon className="h-5 w-5 text-gray-500 mr-2"/>  Global</Badge>
              <Badge className="ml-2" variant="secondary">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2"/> Jun 2020
              </Badge>
            </div> */}
            <p className="text-sm font-medium text-gray-900 mt-2">
            {user?.bio}
            </p>
          </div>
          <div className="flex items-center justify-center mx-5 space-x-4">
      {/* Icons Linked to User's Social Profiles */}
      <p className="text-zinc-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
     </svg>
     </p>
     <p className="text-zinc-500">
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
    </svg>
   
     </p>
   
    </div>
             {session?.user && session.user.id !== user?.id && (
             <FollowUnfollowButton targetUserId={user?.id} />)}
          </div>
          <div className="flex flex-col space-y-2">
          </div>

    {/* Badges for WorkedWith, Followers, and Following */}
    <div className="flex mt-4 items-center  space-x-6">
          <p className="text-l font-bold">13 <span className="text-sm text-zinc-500 font-semibold">Circle</span></p>
          <p className="text-l font-bold">3 <span className="text-sm text-zinc-500 font-semibold">Followers</span></p>
        </div>

    {/* Skill Tags */}
    <div className="flex flex-wrap gap-2 mt-4">
    <Badge variant="secondary">skill</Badge>
      {/* {userSkills.map(skill => (
        <Badge variant="secondary">{skill}</Badge>
      ))} */}
    </div>
    {/* User's Activity Stats */}
    <div className="grid grid-cols-4 gap-2 mt-6">
      {/* Dynamic Content for Activity Stats */}
      <div className="flex items-cente text-center gap-2">
        <p className="font-bold">{}</p>
        <p className="text-l text-gray-500 font-bold">Article</p>
        <p className="text-l text-gray-500 font-bold ">3</p>
      </div>
      <div className="flex items-cente text-center gap-2">
        <p className="font-bold">{}</p>
        <p className="text-l text-gray-500 font-bold">Likes</p>
        <p className="text-l text-gray-500 font-bold ">3</p>
      </div>
      <div className="flex items-cente text-center gap-2">
        <p className="font-bold">{}</p>
        <p className="text-l text-gray-500 font-bold">Saved</p>
        <p className="text-l text-gray-500 font-bold ">3</p>
      </div>
   
      {/* More Stats */}
      {/* ... */}
    </div>
  </div>
  <div className="pt-5">
  <ArticleComponent  articles={articles} />
  </div>
</div>

{/* Right Sidebar */}
<div className='md:col-span-2'>

 
      <MyCommunities />
 
      <TopUser />
  
</div>
</div>
</>
)
}
