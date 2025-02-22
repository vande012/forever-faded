import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services2 from "./components/Services2";
import { CarouselRow } from "./components/CarouselRow";
import MapSection from "./components/MapSection";
import Reviews from "./components/Reviews";
import StaffSection from "./components/StaffSection";
import BackToTop from "./components/BackToTop";
import { getHomepageData } from "./data/loaders";
import { notFound } from "next/navigation";


async function loader() {
  const data = await getHomepageData();
  if (!data) notFound();
  console.log(data);
  return { ...data.data };
}

export default async function Home() {
  const data = await loader();
  console.log(data);
  return (
    <main>
      
        <Hero />
        <WhyUs />
        
      
    </main>
  );
}
