'use client'

import { useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation";
import StaffProfiles from "../components/StaffProfile"

export default function StaffPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Handle scrolling to anchor links
  useEffect(() => {
    // Check if the URL has a hash fragment
    if (typeof window !== 'undefined') {
      // Get hash from URL (e.g., #barber-angel)
      const hash = window.location.hash;
      
      if (hash) {
        // Wait for the DOM to be fully loaded
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[900px] mt-40 w-full">
        <Image
          src="/FFStaff.JPG"
          alt="Barber team at work"
          width={1920}
          height={900}
          priority
          className="object-cover w-full h-[85%] brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-[#D4AF37]">Meet the Barber Team</h1>
          <p className="text-2xl bg-black/80 rounded-lg max-w-4xl py-4 px-2">
            Meet the skilled professionals behind Forever Faded&apos;s reputation for excellence
          </p>
        </div>
      </div>

      {/* Team Introduction */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 gold-gradient-text">Skilled Professionals, Exceptional Results</h2>
          <p className="text-lg text-gray-300 mb-6">
            At Forever Faded, our team consists of passionate, highly-trained barbers who are dedicated to their craft.
            Each member brings their unique style and expertise, ensuring that every client receives the perfect cut.
          </p>
          <p className="text-lg text-gray-300">
            Whether you&apos;re looking for a classic cut, a modern style, or a complete transformation, our team has the
            skills and experience to exceed your expectations.
          </p>
        </div>
      </div>

      {/* Staff Profiles Component - Replaces the original StaffSection */}
      <StaffProfiles />

      {/* Team Values */}
      <div className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center gold-gradient-text">What Sets Our Team Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Continuous Training</h3>
              <p className="text-gray-300">
                Our barbers regularly attend workshops and training sessions to stay updated with the latest techniques
                and trends in the industry.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Client-Focused Approach</h3>
              <p className="text-gray-300">
                We take the time to understand your needs and preferences, ensuring that every haircut is tailored to
                enhance your unique style and features.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Versatile Expertise</h3>
              <p className="text-gray-300">
                From classic cuts to modern styles, our team excels in a wide range of techniques to serve clients of
                all ages and style preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gold-gradient-bg text-black py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Expert Service?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book an appointment with one of our skilled barbers today and discover the Forever Faded difference.
          </p>
          <Link href="https://getsquire.com/booking/brands/forever-faded-llc">
            <button className="bg-black hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-lg">
              Book Your Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
} 