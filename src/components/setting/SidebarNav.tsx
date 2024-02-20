"use client";
import {
  LucideIcon,
  HomeIcon,
  CalendarCheck2Icon,
  PenBoxIcon,
  User2Icon,
  Settings2Icon,
  UserCircle2Icon,
  Users2Icon,
  BellElectricIcon,
  BellIcon,
  FileIcon,
  PlusSquareIcon,
  LockIcon,
  LucideLock,
} from "lucide-react";
import SidebarItem from "@/components/item";

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
    name: "Account",
    path: "/",
    icon: User2Icon,
  },
  {
    name: "Profile",
    path: "/event",
    icon: UserCircle2Icon,
  },
  {
    name: "Security",
    path: "/job",
    icon: LockIcon,
  },
  {
    name: "Password",
    path: "/r/create",
    icon: LucideLock,
  },
  {
    name: "Setting",
    path: "/settings",
    icon: Settings2Icon,
  },
  {
    name: "Notifications",
    path: "/setting",
    icon: BellIcon,
  },
  {
    name: "Posts",
    path: "/setting",
    icon: FileIcon,
  },


];

const Sidebar = () => {
  return (
        <div className="flex flex-col space-y-2 px-2 ">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
   
   
  );
};

export default Sidebar;