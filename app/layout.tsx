import "./globals.css";
import { Urbanist, Roboto, Italianno } from "next/font/google";
import Navbar from "./components/Navbar";
import type React from "react"; // Import React

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap",  // Add this for better loading behavior
});

export const metadata = {
  title: "Your Site Name",
  description: "Your site description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${roboto.variable} ${italianno.variable} font-roboto`}
      >
        <Navbar />
        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}
