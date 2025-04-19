"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Barber data with consistent IDs matching the StaffProfile component
const barberData = [
  {
    id: "angel",
    name: "Angel",
    image: "/images/staff/Angel.jpg",
  },
  {
    id: "christian",
    name: "Christian",
    image: "/images/staff/Christian.webp",
  },
  {
    id: "chelsea",
    name: "Chelsea",
    image: "/images/staff/Chelsea.png",
  },
  {
    id: "megan",
    name: "Megan",
    image: "/images/staff/Megan.jpeg",
  },
  {
    id: "juan",
    name: "Juan",
    image: "/images/staff/Juan.png",
  }
];

interface BarberLinksProps {
  variant?: "grid" | "slider";
  className?: string;
  imageSize?: "small" | "medium" | "large";
  showHeading?: boolean;
}

export default function BarberLinks({ 
  variant = "grid", 
  className = "",
  imageSize = "medium",
  showHeading = true
}: BarberLinksProps) {
  // Determine image size classes
  const getImageSizeClass = () => {
    switch (imageSize) {
      case "small": return "w-16 h-16";
      case "large": return "w-32 h-32";
      case "medium":
      default: return "w-24 h-24";
    }
  };
  
  const imageSizeClass = getImageSizeClass();

  return (
    <div className={`py-8 ${className}`}>
      {showHeading && (
        <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text text-center mb-6">
          Meet Our Barbers
        </h2>
      )}
      
      <div className={`flex ${variant === 'grid' ? 'flex-wrap justify-center gap-4 md:gap-8' : 'overflow-x-auto space-x-4 py-2 px-4 -mx-4'}`}>
        {barberData.map((barber) => (
          <Link
            key={barber.id}
            href={`/staff#barber-${barber.id}`}
            className={`flex flex-col items-center p-2 hover:scale-105 transition-all duration-200 ${variant === 'grid' ? 'w-[calc(50%-1rem)] md:w-auto' : 'flex-shrink-0'}`}
          >
            <div className={`${imageSizeClass} rounded-full overflow-hidden border-2 border-[#D3A84C] relative mb-2`}>
              <Image
                src={barber.image}
                alt={barber.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <span className="text-white font-medium text-center">{barber.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 