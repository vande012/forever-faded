"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImageGallery } from "../components/ui/image-gallery";

const images = [
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 1" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 2" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 3" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 4" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 5" },
  { src: "/whyus.jpg?height=600&width=800", alt: "Why Us 6" },
];

export function CarouselRow() {
  return (
    <div className="w-full mx-auto px-4 relative bg-[#1D1D1D] min-h-[400px] p-8 md:p-12 lg:p-16">
      <motion.h3
        className="text-center text-2xl md:text-3xl lg:text-5xl font-bold gold-gradient-text mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore our styles
      </motion.h3>
      <p className="text-center text-lg text-gray-400 mb-4">
        Discover the latest trends and timeless classics in our gallery.
      </p>
      <ImageGallery images={images} />
      <div className="text-center mt-4">
        <Link
          href="/shop"
          className="rounded gold-gradient-bg px-7 py-3.5 font-roboto text-lg font-semibold text-black transition-colors hover:bg-[#262974]"
        >
          Visit the Gallery
        </Link>
      </div>
    </div>
  );
}