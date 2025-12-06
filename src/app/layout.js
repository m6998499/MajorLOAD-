// src/app/layout.js

import "./globals.css";
import Header from "../components/Header";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

export const metadata = {
  title: "MajorLoad",
  description: "Load board for truckers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Header />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
