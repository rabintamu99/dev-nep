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
    name: "Home",
    path: "/",
    icon: HomeIcon,
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
    name: "Create Community",
    path: "/r/create",
    icon: PlusSquareIcon,
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