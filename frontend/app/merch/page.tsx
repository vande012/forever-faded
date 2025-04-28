import { Metadata } from 'next';
import MerchSection from '../components/MerchSection';

export const metadata: Metadata = {
  title: "Merch | Forever Faded Barbershop",
  description: "Shop our exclusive collection of Forever Faded merchandise. Premium apparel designed to make you stand out, just like our cuts.",
  openGraph: {
    title: "Merch | Forever Faded Barbershop",
    description: "Shop our exclusive collection of Forever Faded merchandise. Premium apparel designed to make you stand out, just like our cuts.",
    type: "website"
  }
};

export default function MerchPage() {
  return (
    <>
      <MerchSection />
    </>
  );
} 