import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Team | Forever Faded Barbershop",
  description: "Meet our skilled team of professional barbers at Forever Faded Barbershop in Waukesha, WI.",
  openGraph: {
    title: "Our Team | Forever Faded Barbershop",
    description: "Meet our skilled team of professional barbers at Forever Faded Barbershop in Waukesha, WI.",
    type: "website",
    url: "/staff"
  }
};

// Ensure data is available during build time
export const dynamic = 'force-static';

// Create a separate client component for the interactive parts
import StaffPageContent from './StaffPageContent';

export default function StaffPage() {
  return(
    <StaffPageContent />
  );
}

