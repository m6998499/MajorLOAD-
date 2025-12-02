import { Inter } from "next/font/google";
import "./globals.css";
// FIXED: Capital "B" in NavBar to match your file name exactly
import Navbar from "../components/Navbar"; 
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MajorLoad",
  description: "Load Board Application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Navbar will ONLY show if the user is logged in */}
        {session && <Navbar />}
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
