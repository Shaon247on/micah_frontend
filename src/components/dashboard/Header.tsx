"use client";

import { Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useUser } from "@/context/UserContext";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useUser();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });


  console.log("the user:", user)

  return (
    <header className="h-16 bg-(--color-surface) border-b border-(--color-border) flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-(--color-border) text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-text-main) lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="text-(--color-text-muted) text-sm">{currentDate}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-end">
          <h3 className="text-sm font-medium text-orange-700">{user?.name}</h3>
          <h5 className="text-xs font-medium text-gray-300">{user?.role === "SUPER_ADMIN" ? "Super Admin" : user?.role}</h5>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
