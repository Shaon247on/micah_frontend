"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

type NavChild = { name: string; href: string };
type NavItem = { name: string; href: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    name: "HVAC Services",
    href: "/hvac-services",
    children: [
      { name: "A/C Rejuvenation", href: "/hvac-services#ac-rejuvenation" },
      { name: "Repair & Tune-Up", href: "/hvac-services#repair-tune-up" },
      { name: "Repair or Replace", href: "/hvac-services#repair-replace" },
    ],
  },
  {
    name: "Other Services",
    href: "/other-services",
    children: [
      {
        name: "Water Quality Solutions",
        href: "/other-services#water-quality",
      },
      {
        name: "Indoor Air Quality",
        href: "/other-services#indoor-air-quality",
      },
    ],
  },
  { name: "How We Work", href: "/how-we-work" },
  { name: "About Us", href: "/about-us" },
  { name: "FAQ", href: "/faq" },
  { name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);
  const { user } = useUser();

  // Close on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setMenuOpen(false);
      setDropdownOpen(null);
    }
  }, [pathname]);

  // Close on outside click
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setDropdownOpen(null);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, closeMenu]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isProtected = pathname.startsWith("/dashboard");
  if (isProtected) return null;

  const toggleDropdown = (name: string) => {
    setDropdownOpen((prev) => (prev === name ? null : name));
  };

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 bg-[#362110] border-b border-[#121F37]/80"
    >
      {/* ── Main bar ── */}
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-16 sm:h-18">
        {/* ✅ Logo - Always redirects to home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity"
          onClick={() => {
            // Ensure it navigates to home
            window.location.href = '/';
          }}
        >
          <Image
            src={user?.companyLogo ?? "/images/logo.png"}
            alt={user?.companyName ?? "Honest HVAC Services logo"}
            width={70}
            height={40}
            className="w-[52px] h-auto sm:w-[62px] lg:w-[70px]"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-[#E07B3F] font-poppins text-base sm:text-lg leading-5 text-wrap max-w-36">
              {user?.companyName ?? "HVAC Service"}
            </span>
          </span>
        </Link>

        {/* ── Desktop nav (xl+) ── */}
        <nav className="hidden xl:flex items-center gap-0.5 text-white">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition hover:bg-white/10 whitespace-nowrap"
              >
                {item.name}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {item.children && (
                <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none group-hover:pointer-events-auto">
                  <div className="rounded-xl bg-[#362110] border border-white/10 shadow-xl py-2 min-w-52">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2.5 text-xs text-white/80 font-medium whitespace-nowrap hover:bg-white/10 hover:text-white transition"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${user?.companyPhone || '0000000000'}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{user?.companyPhone || 'Call Us'}</span>
          </a>
          <Link
            href="/hvac-estimate"
            className="rounded-full bg-[#E07B3F] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#d66b2f] whitespace-nowrap"
          >
            Schedule Service
          </Link>
        </div>

        {/* ── Tablet nav (md → xl) ── */}
        <nav className="hidden md:flex xl:hidden items-center gap-1 text-white ml-auto">
          {navItems
            .filter((i) => !i.children)
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide hover:bg-white/10 transition whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}

          <TabletMoreMenu navItems={navItems} />

          <Link
            href="/hvac-estimate"
            className="ml-2 rounded-full bg-[#E07B3F] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white hover:bg-[#d66b2f] transition whitespace-nowrap"
          >
            Schedule
          </Link>
        </nav>

        {/* ── Hamburger (mobile only) ── */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-white/10 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#362110]/98 px-4 pb-6 pt-3 text-white">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 ${
                          dropdownOpen === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        dropdownOpen === item.name
                          ? "max-h-56 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 flex flex-col gap-0.5 bg-white/5 rounded-xl p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
                            onClick={closeMenu}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`tel:${user?.companyPhone || '0000000000'}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4 opacity-70" />
              {user?.companyPhone || 'Call Us'}
            </a>
            <Link
              href="/hvac-estimate"
              className="rounded-xl bg-[#E07B3F] px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-[#d66b2f] transition"
              onClick={closeMenu}
            >
              Schedule Service
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Tablet "More" dropdown ── */
interface TabletMoreMenuProps {
  navItems: NavItem[];
}

function TabletMoreMenu({ navItems }: TabletMoreMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  const shownNames = navItems
    .filter((i) => !i.children)
    .slice(0, 3)
    .map((i) => i.name);

  const hiddenItems = navItems.filter((i) => !shownNames.includes(i.name));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide hover:bg-white/10 transition text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        More
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 rounded-xl bg-[#362110] border border-white/10 shadow-xl py-2 min-w-56 z-50"
        >
          {hiddenItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {item.name}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      role="menuitem"
                      className="block px-5 py-2 text-xs text-white/80 font-medium hover:bg-white/10 hover:text-white transition"
                      onClick={close}
                    >
                      {child.name}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 my-1" />
                </>
              ) : (
                <Link
                  href={item.href}
                  role="menuitem"
                  className="block px-4 py-2 text-xs text-white/80 font-semibold uppercase tracking-wide hover:bg-white/10 hover:text-white transition"
                  onClick={close}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}