"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiURL } from "../utils/get-strapi-url";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { CarouselApi } from "../components/ui/carousel";

interface FullScreenSliderProps {
  galleryBlock: {
    header: string;
    footer: string;
    cta: {
      text: string;
      href: string;
    };
    galleryimages: {
      url: string;
      alternativeText: string;
    }[];
  };
}

export default function FullScreenSlider({ galleryBlock }: FullScreenSliderProps) {
  const [api, setApi] = useState<CarouselApi>();

  const images = galleryBlock.galleryimages.map(image => ({
    src: `${getStrapiURL()}${image.url}`,
    alt: image.alternativeText || 'Gallery image'
  }));

  useEffect(() => {
    if (!api) return;

    // Auto scroll every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-8 md:py-10 bg-neutral-900">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 gold-gradient-text">
          {galleryBlock.header}
        </h2>
        <p className="text-center mt-5 text-gray-400">{galleryBlock.footer}</p>
        <div className="text-center mt-5 mb-8">
          <a
            href={galleryBlock.cta.href}
            className="inline-block bg-gradient-to-r from-[#A47A1E] via-[#D3A84C] to-[#B58F3E] text-black font-bold px-8 py-3 rounded-full"
          >
            {galleryBlock.cta.text}
          </a>
        </div>

        <div className="relative max-w-[1200px] mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full lg:basis-1/3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33.333vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2">
            <button
              onClick={() => api?.scrollPrev()}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Previous slide"
            >
              ←
            </button>
          </div>
          <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2">
            <button
              onClick={() => api?.scrollNext()}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}