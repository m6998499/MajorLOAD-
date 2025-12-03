"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() { 
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/") return null;

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/loadboard" className="flex items-center">
            <span className="text-xl font-bold text-white">MajorLOAD</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/loadboard" 
              className={`text-sm font-medium transition ${
                pathname === "/loadboard" 
                  ? "text-blue-400" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Load Board
            </Link>
            
            <Link 
              href="/post-load" 
              className={`text-sm font-medium transition ${
                pathname === "/post-load" 
                  ? "text-blue-400" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Post a Load
            </Link>
            
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition ${
                pathname === "/pricing" 
                  ? "text-blue-400" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>

                          <Link
            href="/disclaimer"
            className={`text-sm font-medium transition ${
              pathname === "/disclaimer"
                ? "text-blue-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Disclaimer
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
