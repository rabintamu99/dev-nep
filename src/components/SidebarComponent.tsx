"use client";
import {
  LucideIcon,
  HomeIcon,
  CalendarCheck2Icon,
  PenBoxIcon,
  Settings2Icon,
  FileIcon,
  PlusSquareIcon,

} from "lucide-react";
import SidebarItem from "./item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Feed",
    path: "/",
    icon: HomeIcon,
  },
  // {
  //   name: "Trend",
  //   path: "/trend",
  //   icon: TrendingUpIcon,
  // },
  // {
  //   name: "Ask",
  //   path: "/question",
  //   icon: MessageCircleQuestionIcon,
  // },
  {
    name: "Article",
    path: "/article",
    icon: FileIcon,
  },
  {
    name: "Events",
    path: "/event",
    icon: CalendarCheck2Icon,
  },
  {
    name: "Jobs",
    path: "/job",
    icon: PenBoxIcon,
  },
  {
    name: "Create Circle",
    path: "/c/create",
    icon: PlusSquareIcon,
  },
  {
    name: "Setting",
    path: "/settings",
    icon: Settings2Icon,
  },
  // {
  //   name: "Notifications",
  //   path: "/setting",
  //   icon: BellIcon,
  // },



];

const Sidebar = () => {
  return (
    <div className='md:col-span-2'>
    <div className='overflow-hidden rounded-lg border border-gray-200'>
      <div className='bg-emerald-0 px-4 py-4'>
        <div className="flex flex-col space-y-2 px-2 ">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
           </div>
           <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
             <div className='flex justify-between gap-x-4 py-3'></div>
           </dl>
         </div>
         <div className="p-4 flex items-center justify-center border-t">
          <p className="text-xs text-gray-500">© 2024 DEV NEP, Inc. All rights reserved.</p>
        </div>
       </div>
   
   
   
  );
};

export default Sidebar;

