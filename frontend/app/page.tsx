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
  try {
    const data = await getHomepageData();
    if (!data || !data.data) {
      console.error("Invalid homepage data structure:", data);
      return { blocks: [] };
    }
    return { ...data.data };
  } catch (error) {
    console.error("Error loading homepage data:", error);
    // Return a minimal valid data structure to prevent errors
    return { blocks: [] };
  }
}

export default async function Home() {
  const data = await loader();
  
  // Add safe guard against data not having the expected structure
  if (!data || !data.blocks || !Array.isArray(data.blocks)) {
    console.error("Missing or invalid blocks data:", data);
    return (
      <main>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl gold-gradient-text mb-4">Forever Faded Barbershop</h1>
            <p>Loading content...</p>
          </div>
        </div>
      </main>
    );
  }
  
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
      {hoursBlock && <MapAndContact hours={hoursBlock} />}
    </main>
  );
}
