import Hero from "./components/Hero"
import WhyUs from "./components/WhyUs"
import Services from "./components/Services"
import { CarouselRow } from "./components/CarouselRow"
import MerchSection from "./components/MerchSection"



export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Services />
      <CarouselRow />
      <MerchSection />
    </main>
  )
}

