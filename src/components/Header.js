"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Changed function name to Header
export default function Header() { 
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/") return null;

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
       {/* ... rest of your code ... */}
    </nav>
  );
}
