// src/app/layout.js

import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "MajorLoad",
  description: "Load board for truckers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
