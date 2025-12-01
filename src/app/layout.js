"use client";

import "./globals.css";
import NavBar from "../components/NavBar";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "MajorLoad",
  description: "MajorLoad real-time load board",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar on login page ONLY
  const hideNavbar = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">
        {!hideNavbar && <NavBar />}
        <main>{children}</main>
      </body>
    </html>
  );
}
