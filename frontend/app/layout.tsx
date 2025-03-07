

import "./globals.css";
import { Urbanist, Roboto, Italianno } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type React from "react"; // Import React
import { getFooterData, getNavbarData } from "./data/loaders";
import ClientImageFixer from "./components/ClientImageFixer";
import { usePathname } from 'next/navigation'
import NavbarWrapper from "./components/NavbarWrapper";
import { CartProvider } from "./components/shop/CartContext";
import { LoadingProvider } from './components/ui/LoadingContext';

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
  display: "swap", // Add this for better loading behavior
});


export const metadata = {
  title: "Forever Faded Barbershop | Waukesha, WI",
  description: "Your site description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await getFooterData();
  const navbarData = await getNavbarData();

  
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${roboto.variable} ${italianno.variable} font-roboto`}
      >
         <LoadingProvider>
          <CartProvider>
            <ClientImageFixer />
            <NavbarWrapper data={navbarData} />
              <main>{children}</main>
            <Footer data={footerData} />
          </CartProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
