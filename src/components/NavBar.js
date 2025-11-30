"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="w-full bg-majorTeal text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl tracking-wide">
          MajorLoad
        </Link>

        <nav className="flex gap-4 text-sm">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/loadboard" className="hover:underline">
            Load Board
          </Link>
        </nav>
      </div>
    </header>
  );
}
