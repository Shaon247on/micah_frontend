"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function HashRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash !== "#new-system-quote") return;
    if (pathname === "/hvac-estimate") return;

    router.replace(`/hvac-estimate`);
  }, [pathname, router]);

  return null;
}
