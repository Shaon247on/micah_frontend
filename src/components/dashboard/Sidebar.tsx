"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Info,
  Settings,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import { LogoutButton } from "../auth/LogoutButton";
import { useUser } from "@/context/UserContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    name: "Quote Requests",
    path: "/dashboard/quote-requests",
    icon: FileText,
  },
  // { name: 'Services', path: '/dashboard/services', icon: Wrench },
  { name: "FAQ", path: "/dashboard/faq", icon: HelpCircle },
  { name: "About Us", path: "/dashboard/about", icon: Info },
  { name: "Blogs Management", path: "/dashboard/blogs", icon: Newspaper },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="w-[260px] bg-(--color-surface) border-r border-(--color-border) flex flex-col h-full">
      <Link href={"/"} onClick={onLinkClick}>
        <div className="px-6 py-6 flex items-center gap-3 border-b border-(--color-border)">
          <Image
            width={100}
            height={100}
            alt="Company Logo"
            src={user?.companyLogo || "/images/logo.png"}
            className="size-12 rounded-lg"
          />
          <h3 className="leading-4 text-sm font-semibold text-orange-600 text-wrap max-w-36">
            {user?.companyName}
          </h3>
        </div>
      </Link>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              onClick={onLinkClick}
              className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-(--color-text-muted) transition-colors duration-200 ${isActive ? "bg-(--color-primary-light) text-(--color-primary) font-medium border-l-4 border-(--color-primary)" : "hover:bg-(--color-bg) hover:text-(--color-text-main)"}`}
            >
              <item.icon className="mr-3" size={20} />
              <span className="flex-1 text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-(--color-border)">
        <div className="flex items-center p-2">
          <Image
            width={40}
            height={40}
            className="w-10 h-10 rounded-full mr-3"
            src={
              user?.avatar ??
              "https://i.pinimg.com/736x/96/e2/a7/96e2a7d987ce19f693d39f131cda092a.jpg"
            }
            alt={user?.name || "avater Image"}
          />
          <div className="flex-1 flex flex-col">
            <span className="text-sm font-semibold text-(--color-text-main)">
              {user?.name}
            </span>
            <span className="text-xs text-(--color-text-muted)">
              {user?.role === "SUPER_ADMIN" ? "Super Admin" : user?.role}
            </span>
          </div>
          <LogoutButton />
          {/* <button
            className="text-(--color-text-muted) p-2 transition-colors duration-200 hover:text-(--color-text-main)"
            onClick={() => router.push("/sign-in")}
          >
            <LogOut size={18} />
          </button> */}
        </div>
      </div>
    </aside>
  );
}
