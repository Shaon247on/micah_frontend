"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeSidebar}
      />
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[260px] transform bg-(--color-surface) border-r border-(--color-border) transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onLinkClick={closeSidebar} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header onToggleSidebar={toggleSidebar} />
        <main style={{ flex: 1, overflowY: "auto", padding: "32px", backgroundColor: "var(--color-bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

