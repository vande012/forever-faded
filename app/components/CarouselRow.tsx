"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Link from "next/link";

const images = [
  "/whyus.jpg?height=600&width=800",
  "/whyus.jpg?height=600&width=800",
  "/whyus.jpg?height=600&width=800",
  "/whyus.jpg?height=600&width=800",
  "/whyus.jpg?height=600&width=800",
  "/whyus.jpg?height=600&width=800",
];

export function CarouselRow() {
  return (
    <div className="w-full mx-auto px-4 relative bg-[#1D1D1D] min-h-[400px] p-8 md:p-12 lg:p-16">
      <motion.h3
        className="text-center text-2xl md:text-3xl lg:text-5xl font-bold gold-gradient-text mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore our styles
      </motion.h3>
      <p className="text-center text-lg text-gray-400 mb-8">
        Discover the latest trends and timeless classics in our gallery.
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image src={src || "/placeholder.svg"} alt={`Slide ${index + 1}`} fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
          <CarouselPrevious variant="secondary" className="relative h-11 w-11" />
          <CarouselNext variant="secondary" className="relative h-11 w-11" />
        </div>
      </Carousel>
      <div className="text-center mt-8">
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