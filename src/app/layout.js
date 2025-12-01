import { Inter } from "next/font/google";
import "./globals.css";
// FIXED: Changed "Navbar" to "NavBar" (Capital B) to match your file exactly
import Navbar from "../components/NavBar"; 
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
        {/* Only render the Navbar if the user is logged in */}
        {session && <Navbar />}
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
