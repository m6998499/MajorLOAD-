import "../globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "MajorLoad",
  description: "MajorLoad real-time load board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
