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
import type { Metadata } from "next";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap", // Add this for better loading behavior
});
const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap", // Add this for better loading behavior
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forever-faded.vercel.app'),
  title: {
    default: "Forever Faded Barbershop | Waukesha, WI",
    template: "%s | Forever Faded Barbershop"
  },
  description: "Premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services",
  keywords: ["barbershop", "Waukesha", "haircuts", "beard trims", "grooming"],
  robots: {
    index: true,
    follow: true
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: '/favicon.ico' }
    ]
  }
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
