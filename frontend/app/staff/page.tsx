import React, { Suspense } from "react";
import { Metadata } from "next";
import StaffProfiles from "../components/StaffProfile";

export const metadata: Metadata = {
  title: "Meet Our Team | Forever Faded Barbershop",
  description: "Meet the skilled barbers at Forever Faded who are dedicated to providing exceptional service and haircuts that leave you looking and feeling your best.",
  openGraph: {
    title: "Our Team | Forever Faded Barbershop",
    description: "Meet our skilled team of professional barbers at Forever Faded Barbershop in Waukesha, WI.",
    type: "website",
    url: "/staff"
  }
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

