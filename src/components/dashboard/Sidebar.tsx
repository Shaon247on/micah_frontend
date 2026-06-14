"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  HelpCircle,
  Info,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    name: "Quote Requests",
    path: "/dashboard/quote-requests",
    icon: FileText,
    badge: 3,
  },
  // { name: 'Services', path: '/dashboard/services', icon: Wrench },
  { name: "FAQ", path: "/dashboard/faq", icon: HelpCircle },
  { name: "About Us", path: "/dashboard/about", icon: Info },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-[260px] bg-(--color-surface) border-r border-(--color-border) flex flex-col h-full">
      <Link href={"/"}>
        <div className="px-6 py-6 flex items-center border-b border-(--color-border)">
          <div className="bg-(--color-primary) text-white w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14h16" />
              <path d="M4 10h16" />
              <path d="M10 6h10" />
            </svg>
          </div>
        </div>
      </Link>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-(--color-text-muted) transition-colors duration-200 ${isActive ? "bg-(--color-primary-light) text-(--color-primary) font-medium border-l-4 border-(--color-primary)" : "hover:bg-(--color-bg) hover:text-(--color-text-main)"}`}
            >
              <item.icon className="mr-3" size={20} />
              <span className="flex-1 text-sm">{item.name}</span>
              {item.badge && (
                <span className="bg-(--color-primary) text-white text-[0.75rem] px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-(--color-border)">
        <div className="flex items-center p-2">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=c25e28&color=fff"
            alt="Sarah Mitchell"
          />
          <div className="flex-1 flex flex-col">
            <span className="text-sm font-semibold text-(--color-text-main)">
              Sarah Mitchell
            </span>
            <span className="text-xs text-(--color-text-muted)">
              Super Admin
            </span>
          </div>
          <button
            className="text-(--color-text-muted) p-2 transition-colors duration-200 hover:text-(--color-text-main)"
            onClick={() => router.push("/sign-in")}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
