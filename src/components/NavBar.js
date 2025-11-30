"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/login", label: "Login" },
  { href: "/loadboard", label: "Load Board" },
  { href: "/post-load", label: "Post a Load" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/login" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500">
            <span className="text-sm font-bold text-white">ML</span>
          </div>
          <span className="text-base font-semibold text-white tracking-wide">
            MajorLoad
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "text-slate-200 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
