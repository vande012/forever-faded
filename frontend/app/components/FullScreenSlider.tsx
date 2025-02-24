"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getStrapiURL } from "../utils/get-strapi-url";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../components/ui/carousel";

interface GalleryImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

interface GalleryBlock {
  id: number;
  header: string;
  footer: string;
  galleryimages: GalleryImage[];
  cta: {
    text: string;
    href: string;
  };
}

interface FullScreenSliderProps {
  galleryBlock: GalleryBlock;
}

export default function FullScreenSlider({ galleryBlock }: FullScreenSliderProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const images = galleryBlock.galleryimages.map(image => ({
    src: `${getStrapiURL()}${image.url}`,
    alt: image.alternativeText || 'Gallery image'
  }));

  // Update to create groups of 4 images instead of 6
  const imageGroups = images.reduce((acc, _, index) => {
    if (index % 4 === 0) {
      const group = [];
      for (let i = 0; i < 4; i++) {
        const imageIndex = index + i;
        group.push(images[imageIndex] || images[imageIndex % images.length]);
      }
      acc.push(group);
    }
    return acc;
  }, [] as typeof images[]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const newCurrent = api.selectedScrollSnap();
      setCurrent(newCurrent);
      
      // Pause for 3 seconds when new images appear
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    });
  }, [api]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startInterval = () => {
      interval = setInterval(() => {
        if (!isPaused) {
          api?.scrollNext();
        }
      }, 8000);
    };

    if (api) {
      startInterval();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [api, isPaused]);

  const nextSlide = () => {
    api?.scrollNext();
  };

  const prevSlide = () => {
    api?.scrollPrev();
  };

  return (
    <section className="py-8 md:py-10 bg-neutral-900 px-1">
      <div className="container mx-auto px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 gold-gradient-text">
          {galleryBlock.header}
        </h2>
        <p className="text-center mt-5 text-gray-400">{galleryBlock.footer}</p>
        <div className="text-center mt-5 mb-4">
          <a
            href={galleryBlock.cta.href}
            className="inline-block bg-gradient-to-r from-[#A47A1E] via-[#D3A84C] to-[#B58F3E] text-black font-bold px-8 py-3 rounded-full"
          >
            {galleryBlock.cta.text}
          </a>
        </div>
        <div className="w-full md:w-[800px] mx-auto relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              duration: 1000,
            }}
          >
            <CarouselContent className="-ml-0">
              {imageGroups.map((group, groupIndex) => (
                <CarouselItem key={groupIndex} className="pl-0 basis-full">
                  <div className="grid grid-cols-2 gap-1 aspect-square w-full">
                    {group.map((image, imageIndex) => (
                      <a
                        key={imageIndex}
                        href={galleryBlock.cta.href}
                        className="relative aspect-square overflow-hidden block cursor-pointer group"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300 p-1"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          priority={groupIndex === 0}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-0 h-full w-16 md:w-24 flex items-center justify-center bg-gradient-to-r from-black/50 to-transparent text-white hover:from-black/60 transition-all z-10"
            aria-label="Previous images"
          >
            <span className="text-2xl">←</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-0 h-full w-16 md:w-24 flex items-center justify-center bg-gradient-to-l from-black/50 to-transparent text-white hover:from-black/60 transition-all z-10"
            aria-label="Next images"
          >
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}