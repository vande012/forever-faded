"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {isClient && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover z-0"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="text-center">
          <Image
            src="/hero-logo.png"
            alt="Hero Logo"
            width={500} // adjust based on your logo size
            height={500} // adjust based on your logo size
            className="mx-auto mb-8 w-80 h-80 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96"
          />

          <div className="space-x-4">
            <Link
              href="/shop"
              className="rounded gold-gradient-bg px-5 py-2.5 sm:px-7 sm:py-3.5 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-[#262974]"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="rounded border-2 border-white bg-transparent px-4 py-2 sm:px-6 sm:py-3 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#1E1E1E]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}