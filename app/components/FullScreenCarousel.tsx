"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "./ui/carousel-dot-button";
import Image from "next/image";

interface FullScreenCarouselProps {
  slides: { src: string; alt: string }[];
}

export const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container h-screen">
          {slides.map((slide, index) => (
            <div className="embla__slide w-full h-full flex items-center justify-center" key={index}>
              <Image src={slide.src} alt={slide.alt} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage of FullScreenCarousel with slide.png
const slides = [
  { src: "/slide.png", alt: "Slide 1" },
  { src: "/slide.png", alt: "Slide 2" },
  { src: "/slide.png", alt: "Slide 3" },
];

export default function CarouselPage() {
  return <FullScreenCarousel slides={slides} />;
}