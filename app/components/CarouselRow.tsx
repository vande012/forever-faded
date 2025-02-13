"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImageGallery } from "../components/ui/image-gallery";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 1" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 2" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 3" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 4" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 5" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 6" },
];

export function CarouselRow() {
  const [, setCurrent] = useState(0);
  const count = images.length;

  const scrollPrev = () => {
    setCurrent((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const scrollNext = useCallback(() => {
    setCurrent((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  useEffect(() => {
    const timer = setInterval(scrollNext, 5000);
    return () => clearInterval(timer);
  }, [scrollNext]);

  return (
    <div className="w-full mx-auto px-4 relative bg-[#1D1D1D] min-h-[400px] p-4 md:p-8 lg:p-12">
      <motion.h3
        className="text-center text-3xl md:text-3xl lg:text-5xl font-bold gold-gradient-text mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore our styles
      </motion.h3>
      <p className="text-center text-base md:text-lg text-gray-400">
        Discover the latest trends and timeless classics in our gallery.
      </p>
      <ImageGallery images={images} />
      <div className="text-center mb-6">
        <div className="flex justify-center gap-1 mt-4 md:mt-6">
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 gold-gradient-bg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4 text-black" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 gold-gradient-bg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Link href="/shop">
          <Button className="gold-gradient-bg text-black mt-5 px-5 py-3 font-roboto text-base md:text-lg font-semibold transition-colors hover:bg-[#262974]">
            Visit the Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
}