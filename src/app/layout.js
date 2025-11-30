import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "MajorLoad",
  description: "MajorLoad freight load board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <NavBar />    {/* navbar renders FIRST */}
        {children}     {/* pages render underneath */}
      </body>
    </html>
  );
}
