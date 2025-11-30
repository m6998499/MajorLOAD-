import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "MajorLoad",
  description: "MajorLoad carrier load board"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
