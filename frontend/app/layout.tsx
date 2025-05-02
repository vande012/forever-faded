import "./globals.css";
import { Urbanist, Roboto, Italianno } from "next/font/google";
import type React from "react"; // Import React
import { getFooterData, getNavbarData } from "./data/loaders";
import ClientImageFixer from "./components/ClientImageFixer";
import NavbarWrapper from "./components/NavbarWrapper";
import AnalyticsWrapper from "./components/AnalyticsWrapper";

import { LoadingProvider } from './components/ui/LoadingContext';
import { CareerModalProvider } from './components/CareerModalContext';
import type { Metadata, Viewport } from "next";
import BackToTopWrapper from './components/BackToTopWrapper';
import ClientFooterWrapper from './components/ClientFooterWrapper';

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
    default: "Forever Faded | Waukesha Barbershop",
    template: "%s | Forever Faded"
  },
  description: "Premier barbershop in Waukesha County offering professional haircuts, beard trims, and grooming services for all hair types and styles.",
  keywords: ["barbershop", "Waukesha", "haircuts", "beard trims", "grooming", "men's haircuts", "fade haircut", "barber services"],
  icons: {
    icon: [
      { url: `${siteUrl}/favicon.ico`, sizes: 'any' }
    ],
    shortcut: `${siteUrl}/favicon.ico`,
    apple: [
      { url: `${siteUrl}/favicon.ico` }
    ]
  },
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
    title: "Forever Faded | Waukesha Barbershop",
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
      <head>
      <meta name="google-site-verification" content="usNx3H5haVdrFjQ58S2oav_WIs4g4C32CUs_gHfvGhc" />
      <link rel="icon" href={`${siteUrl}/favicon.ico`} sizes="any" />
      <link rel="apple-touch-icon" href={`${siteUrl}/favicon.ico`} />
      </head>
      <body
        className={`${urbanist.variable} ${roboto.variable} ${italianno.variable} font-roboto`}
      >
         <LoadingProvider>
            <CareerModalProvider>
              <ClientImageFixer />
              <header>
                <NavbarWrapper data={navbarData} />
              </header>
              <main>
                {children}
              </main>
              <footer>
                <ClientFooterWrapper data={footerData} />
              </footer>
              <BackToTopWrapper />
            </CareerModalProvider>
        </LoadingProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
