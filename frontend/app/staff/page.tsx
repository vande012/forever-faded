import React, { Suspense } from "react";
import { Metadata } from "next";


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  title: "Meet Our Team | Forever Faded Barbershop",
  description: "Meet the skilled barbers at Forever Faded who are dedicated to providing exceptional service and haircuts that leave you looking and feeling your best.",
  alternates: {
    canonical: `${siteUrl}/staff`,
  },
  openGraph: {
    title: "Our Team | Forever Faded Barbershop",
    description: "Meet our skilled team of professional barbers at Forever Faded Barbershop in Waukesha, WI.",
    type: "website",
    url: `${siteUrl}/staff`,
    images: [
      {
        url: `${siteUrl}/hero-logo.png`,
        width: 1200,
        height: 630,
        alt: "Forever Faded Barbershop Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Forever Faded Barbershop",
    description: "Meet our skilled team of professional barbers at Forever Faded",
    images: [`${siteUrl}/hero-logo.png`],
  },
};

function StaffPageLoading() {
  return <div className="bg-[#1d1d1d] min-h-screen flex items-center justify-center">
    <div className="text-white text-xl">Loading team information...</div>
  </div>;
}

export default function StaffPage() {
  return (
    <main className="bg-[#1d1d1d] min-h-screen">
      <Suspense fallback={<StaffPageLoading />}>
        <StaffPageContent />
      </Suspense>
    </main>
  );
}

// Using a separate client component for the interactive parts
import StaffPageContent from './StaffPageContent';

