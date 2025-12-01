"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  // Hide navbar on login page
  if (pathname === "/login") return null;

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          MajorLoad
        </Link>

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
