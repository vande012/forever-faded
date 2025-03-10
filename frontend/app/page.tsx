import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services2 from "./components/Services2";
import FullScreenSlider from "./components/FullScreenSlider";
import MapSection from "./components/MapSection";
import Reviews from "./components/Reviews";
import StaffSection from "./components/StaffSection";
import BackToTop from "./components/BackToTop";
import { getHomepageData } from "./data/loaders";
import { notFound } from "next/navigation";
import MerchSlider  from "./components/MerchSlider"
import MapAndContact from "./components/MapSection";
import RecentBlogPosts from "./components/RecentBlogPosts";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Forever Faded Barbershop | Waukesha, WI",
  description: "Experience premium barbering services at Forever Faded Barbershop in Waukesha, WI. Book your appointment today for expert haircuts and beard trims.",
};

async function loader() {
  const data = await getHomepageData();
  if (!data) notFound();
  console.log(data);
  return { ...data.data };
}

export default async function Home() {
  const data = await loader();
  const galleryBlock = data.blocks.find(
    (block: any) => block.__component === "blocks.gallery"
  );
  const hoursBlock = data.blocks.find(
    (block: any) => block.__component === "blocks.hours"
  );
  return (
    <main>
      
        <Hero />
        <WhyUs />
        <Services2 />
        <Reviews />
        <MerchSlider />
        {galleryBlock && <FullScreenSlider galleryBlock={galleryBlock} />}
        <StaffSection />
        <BackToTop />
        <RecentBlogPosts />
        <MapAndContact hours={hoursBlock} />

    </main>
  );
}
