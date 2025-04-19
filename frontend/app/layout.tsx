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
import type { Metadata, Viewport } from "next";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forever Faded Barbershop | Waukesha, WI",
    template: "%s | Forever Faded Barbershop"
  },
  description: "Premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services for all hair types and styles.",
  keywords: ["barbershop", "Waukesha", "haircuts", "beard trims", "grooming", "men's haircuts", "fade haircut", "barber services"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Forever Faded Barbershop",
    title: "Forever Faded Barbershop | Premier Barber Services in Waukesha, WI",
    description: "Premier barbershop in Waukesha offering professional haircuts, beard trims, and grooming services for all hair types and styles.",
    images: [
      {
        url: `${siteUrl}/hero-logo.png`,
        width: 1200,
        height: 630,
        alt: "Forever Faded Barbershop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Faded Barbershop",
    description: "Premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services",
    images: [`${siteUrl}/hero-logo.png`],
  },
  authors: [{ name: "Forever Faded Barbershop" }],
  creator: "Forever Faded Barbershop",
  publisher: "Forever Faded Barbershop",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

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
