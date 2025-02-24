"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../components/ui/carousel";
import { useState, useEffect } from "react";
import { getHomepageData } from "../data/loaders";
import { getStrapiURL } from "../utils/get-strapi-url";



interface MerchBlock {
  __component: "blocks.merch-section";
  id: number;
  header: string;
  subheader: string;
  description: string;
  merchslider: {
    id: number;
    merchimage: {
      id: number;
      documentId: string;
      url: string;
      alternativeText: string | null;
    }[];
  };
  cta: {
    id: number;
    text: string;
    href: string;
    isExternal: boolean;
  };
}

interface HomepageData {
  id: number;
  blocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function MerchSlider() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageData = await getHomepageData();
        setData(homepageData.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        console.error("Error fetching merch data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const autoPlay = React.useCallback(() => {
    if (!api) return;

    api.scrollNext();
    if (current === count - 1) {
      api.scrollTo(0);
    }
  }, [api, current, count]);

  React.useEffect(() => {
    const timer = setInterval(autoPlay, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading merch items.</p>;

  const isMerchSectionBlock = (block: any): block is MerchBlock => {
    return block.__component === "blocks.merch-section";
  };

  const merchSection = data.blocks.find(isMerchSectionBlock);

  if (!merchSection) {
    return <div>Merch section not found</div>;
  }

  const merchImages = merchSection.merchslider.merchimage.map(image => ({
    url: `${getStrapiURL()}${image.url}`,
    alt: image.alternativeText || 'Forever Faded Merch'
  }));

  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gold-gradient-text">
          {merchSection.header}
        </h2>
        <div className="mb-12">
          <p className="text-xl text-white text-center mb-4">
            {merchSection.subheader}
          </p>
          <p className="text-gray-400 text-center max-w-3xl mx-auto">
            {merchSection.description}
          </p>
        </div>
        <div className="text-center mt-8 pb-4">
          <a
            href={merchSection.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[#A47A1E] via-[#D3A84C] to-[#B58F3E] text-black font-bold px-8 py-3 rounded-full"
          >
            {merchSection.cta.text}
          </a>
        </div>
        <Carousel
          setApi={setApi}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {merchImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover aspect-square"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
        </Carousel>
      </div>
    </section>
  );
}