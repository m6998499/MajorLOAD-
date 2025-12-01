import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // VERIFY THIS PATH matches your project structure
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route"; // VERIFY THIS PATH to your auth options

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MajorLoad",
  description: "Load Board Application",
};

export default async function RootLayout({ children }) {
  // 1. Check if the user is logged in
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Only render Navbar if a session exists */}
        {session && <Navbar />} 
        
        {/* 3. Render the page content (Login or Load Board) */}
        {children}
      </body>
    </html>
  );
}
