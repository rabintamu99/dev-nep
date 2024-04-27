
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge"
import getUser from "@/lib/getUser";
import { CalendarIcon, CheckCircle2Icon, CircleDashed, ClockIcon, ExternalLinkIcon, GithubIcon, LinkedinIcon, LocateIcon, LucideGithub, MapPinIcon, PlayIcon, SmileIcon, TicketCheckIcon, TwitterIcon, XIcon } from "lucide-react";

import { getAuthSession } from '@/lib/auth';
import { Button } from "@/components/ui/Button";
import Sidebar from "@/components/SidebarComponent";


export default async function profilePage({
  params: { username },
}: {
  params: { username: string }
}) {

  const user = await getUser(username);
return (
  <>
 
  <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
            <div className="flex items-center mt-2">
              <Badge variant="secondary"><MapPinIcon className="h-5 w-5 text-gray-500 mr-2"/>  Global</Badge>
              <Badge className="ml-2" variant="secondary">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2"/> Jun 2020
              </Badge>
            </div>
            <p className="text-sm font-medium text-gray-900 mt-2">
            {user?.bio}
            </p>
          </div>
          <Button variant="outline">Follow</Button>
          </div>

          <div className="flex flex-col space-y-2">
            
          </div>

    {/* Badges for WorkedWith, Followers, and Following */}
    <div className="flex mt-4 items-center justify-center space-x-6">
          <p className="text-sm font-semibold">13 ・WorkedWith</p>
          <p className="text-sm font-semibold">315 ・Followers</p>
          <p className="text-sm font-semibold">328 ・Following</p>
        </div>

    {/* Skill Tags */}
    <div className="flex flex-wrap gap-2 mt-4">
      {/* {userSkills.map(skill => (
        <Badge variant="secondary">{skill}</Badge>
      ))} */}
    </div>

    {/* Social Media Links */}
    <div className="flex items-center mt-4 space-x-4">
      {/* Icons Linked to User's Social Profiles */}
      <LinkedinIcon className="text-blue-700" />
      <XIcon className="text-blue-400" />
      <LucideGithub className="text-gray-900" />
      <ExternalLinkIcon className="text-gray-600" />
    </div>


    {/* User's Activity Stats */}
    <div className="grid grid-cols-3 gap-4 mt-6">
      {/* Dynamic Content for Activity Stats */}
      <div className="text-center">
        <p className="font-bold">{}</p>
        <p className="text-sm text-gray-500">Profile</p>
      </div>
      <div className="text-center">
        <p className="font-bold">{}</p>
        <p className="text-sm text-gray-500">Profile</p>
      </div>
      {/* More Stats */}
      {/* ... */}
    </div>
  </div>
   </>
)
}
