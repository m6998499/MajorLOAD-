"use client";

import "./globals.css";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar on login page ONLY
  const hideNavbar = pathname === "/login";

  return (
    <html lang="en">
      <body>
        {!hideNavbar && <NavBar />}  {/* navbar only when logged in */}
        <main>{children}</main>
      </body>
    </html>
  );
}
