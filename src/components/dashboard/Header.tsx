"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

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
      <div className="flex items-center">
        <Image
          width={32}
          height={32}
          src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=c25e28&color=fff"
          alt="Profile"
          className="w-8 h-8 rounded-full border border-(--color-border)"
        />
      </div>
    </header>
  );
}
