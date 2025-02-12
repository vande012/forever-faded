import Hero from "./components/Hero"
import WhyUs from "./components/WhyUs"
import Services2 from "./components/Services2"
import { CarouselRow } from "./components/CarouselRow"
import MapSection from "./components/MapSection"
import Reviews from "./components/Reviews"
import MerchSlider from "./components/MerchSlider"
import StaffSection from "./components/StaffSection"
import BackToTop from "./components/BackToTop"


export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Reviews />
      <Services2 />
      <StaffSection />
      <MerchSlider />
      <CarouselRow />
      <MapSection />
      <BackToTop />
    </main>
  )
}