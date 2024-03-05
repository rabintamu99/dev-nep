
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge"
import getUser from "@/lib/getUser";
import { CalendarIcon, ClockIcon } from "lucide-react";



export default async function profilePage({
  params: { username },
}: {
  params: { username: string }
}) {

  const user = await getUser(username);

 console.log(user);

 
  return (
    <>
   

<div className="bg-white rounded-lg p-6 w-[300px] shadow">
      <div className="flex justify-center items-center relative mb-4">
        <div className="">
        <UserAvatar
          user={{ name: user.data.user.name || 'Unnamed User', image: user.data.user.image || '/default-avatar.png' }}
          className='h-20 w-20 mx-2'
          />
        </div>
        <div className="absolute bottom-0 right-2 bg-white rounded-full p-2 border-2 border-blue-500">
          <Badge variant="secondary">3</Badge>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-500 mb-1">Level 3</div>
        <div className="text-xs text-gray-400 mb-4">12 points to level up</div>
        <div className="text-lg font-bold mb-1">{user.data.user.name}</div>
        <div className="text-sm text-gray-500 mb-4">{user.data.user.username}</div>
        <p className="text-sm mb-4">
          Help to make the world a better place, by supporting, learning and growing. Each step counts. 🙏
        </p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div>
            <ClockIcon className="inline-block" />
            Active 6h ago{"\n              "}
          </div>
          <div>
            <CalendarIcon className="inline-block" />
            Joined Feb 17, 2024{"\n              "}
          </div>
        </div>
        <div className="border-t border-b py-2">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-lg font-bold">14</div>
              <div className="text-sm text-gray-500">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">1</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

