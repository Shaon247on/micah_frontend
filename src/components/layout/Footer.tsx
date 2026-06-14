"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isProtected = pathname.startsWith("/dashboard");
  if (isProtected) {
    return <></>;
  }
  return (
    <footer className="bg-(--primary) text-[#858C95]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr_1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DE7B42]">
                Fast. Fair. Fixed.
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Joliet's Family Owned HVAC Contractor
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#B1B7C0]">
              Based in Joliet, Illinois, serving the Joliet Area.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3C4A67] bg-white/5 px-4 py-2 text-sm text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DE7B42] text-[#253147]">
                  🏠
                </span>
                Family-owned
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3C4A67] bg-white/5 px-4 py-2 text-sm text-[#DE7B42]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#DE7B42]" />
                Not PE-backed
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DE7B42]">
              Services
            </p>
            <div className="mt-6 grid gap-3 text-sm leading-7">
              <Link href="/" className="transition hover:text-white">
                A/C Rejuvenation
              </Link>
              <Link href="/" className="transition hover:text-white">
                Repair & Tune-Up
              </Link>
              <Link href="/" className="transition hover:text-white">
                Repair or Replace?
              </Link>
              <Link href="/" className="transition hover:text-white">
                Water Quality Solutions
              </Link>
              <Link href="/" className="transition hover:text-white">
                Indoor Air Quality & Moisture Control
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DE7B42]">
              Contact
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7">
              <a
                href="#"
                className="block text-xl font-semibold text-white"
                aria-disabled="true"
              >
                Phone Number
              </a>
              <p className="transition hover:text-white">
                <span className="font-semibold text-white">Schedule Online</span>
              </p>
              <p className="transition hover:text-white">
                <span className="font-semibold text-white">hvac.com</span>
              </p>
              <p className="text-[#B1B7C0]">Joliet, Illinois</p>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.99H7.898v-2.887h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563v1.875h2.773l-.443 2.887h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.503 2.503 0 0 1 12 9.5zM18 6.5a.9.9 0 1 1-.9.9A.9.9 0 0 1 18 6.5z" />
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[#858C95] sm:flex sm:items-center sm:justify-between">
          <p>© 2026 HVAC A/C & Plumbing. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">It’s About Time</p>
        </div>
      </div>
    </footer>
  );
}
