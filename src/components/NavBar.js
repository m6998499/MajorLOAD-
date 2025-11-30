"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full bg-[#020817] border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-white">
          MajorLoad
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* 👈 IMPORTANT: Login now goes to "/" */}
          <Link href="/" className="text-gray-300 hover:text-white">
            Login
          </Link>

          <Link href="/loadboard" className="text-gray-300 hover:text-white">
            Load Board
          </Link>

          <Link href="/post-load" className="text-gray-300 hover:text-white">
            Post a Load
          </Link>
        </div>
      </div>
    </nav>
  );
}
