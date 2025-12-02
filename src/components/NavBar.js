"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  // Logic: Hide navbar on login page OR the root home page "/"
  if (pathname === "/login" || pathname === "/") return null;

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo linking to Home */}
        <Link href="/" className="text-xl font-bold text-white">
          MajorLoad
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link href="/loadboard" className="text-sm text-slate-200 hover:text-white">
            Load Board
          </Link>
          <Link href="/post-load" className="text-sm text-slate-200 hover:text-white">
            Post a Load
          </Link>
        </div>
      </div>
    </nav>
  );
}
