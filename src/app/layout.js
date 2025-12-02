// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // <--- CHANGE THIS IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MajorLoad",
  description: "Load board for truckers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* <--- CHANGE THIS COMPONENT TAG */}
        {children}
      </body>
    </html>
  );
}
