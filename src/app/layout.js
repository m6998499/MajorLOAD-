import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MajorLoad",
  description: "Load Board Application",
};

export default async function RootLayout({ children }) {
  // Check for the user session on the server
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Only render the Navbar if the user is logged in (has a session) */}
        {session && <Navbar />}
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
