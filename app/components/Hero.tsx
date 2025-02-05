"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {isClient && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="fixed top-0 left-0 min-h-full min-w-full object-cover"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="fixed top-0 left-0 h-full w-full bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-urbanist text-7xl font-bold text-white md:text-6xl lg:text-9xl">
            Forever Faded
          </h1>
          <p className="mb-8 font-italianno text-7xl text-[#ca2c2b] md:text-9xl">
            For the Culture
          </p>

          <div className="space-x-4">
            <Link
              href="/shop"
              className="rounded bg-[#CA2C2B] px-7 py-3.5 font-roboto text-lg font-semibold text-white transition-colors hover:bg-[#262974]"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="rounded border-2 border-white bg-transparent px-6 py-3 font-roboto text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#1E1E1E]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}