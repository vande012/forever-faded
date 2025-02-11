import Hero from "./components/Hero"
import WhyUs from "./components/WhyUs"
import Services2 from "./components/Services2"
import { CarouselRow } from "./components/CarouselRow"
import MerchSection from "./components/MerchSection"
import FullScreenSlider from "./components/FullScreenSlider"
import MapSection from "./components/MapSection"
import Reviews from "./components/Reviews"

const images = [
  { 
    src: "/Slide.jpg", // Image should be 1920x960 pixels (2:1 ratio)
    alt: "Barber shop interior" 
  },
  { 
    src: "/Slide2.jpg", // Image should be 1920x960 pixels (2:1 ratio)
    alt: "Barber cutting hair" 
  },
  { 
    src: "/Slide3.jpg", // Image should be 1920x960 pixels (2:1 ratio)
    alt: "Various barber tools" 
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Reviews />
      <Services2 />
      <CarouselRow />
      <MerchSection />
      <FullScreenSlider images={images} />
      <MapSection />
    </main>
  )
}