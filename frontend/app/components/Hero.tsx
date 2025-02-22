"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getHomepageData } from "../data/loaders";
import { getStrapiURL } from "../utils/get-strapi-url";

interface HeroSectionBlock {
  __component: "blocks.hero-section";
  id: number;
  logo: {
    id: number;
    url: string;
    alternativeText: string | null;
  };
  video: {
    id: number;
    url: string;
  };
  cta1: {
    id: number;
    text: string;
    href: string;
    isExternal: boolean;
  };
  cta2: {
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

export default function Hero() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageData = await getHomepageData();
        setData(homepageData.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching homepage data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Error loading content
      </div>
    );
  }

  const isHeroSectionBlock = (block: any): block is HeroSectionBlock => {
    return block.__component === "blocks.hero-section";
  };

  const heroSection = data.blocks.find(isHeroSectionBlock);

  if (!heroSection) {
    return <div>Hero section not found</div>;
  }

  // Get the full URLs for media
  const logoUrl = heroSection.logo
    ? `${getStrapiURL()}${heroSection.logo.url}`
    : null;
  const logoAltText = heroSection.logo?.alternativeText;
  const videoUrl = heroSection.video
    ? `${getStrapiURL()}${heroSection.video.url}`
    : null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute top-0 left-0 h-full w-full bg-black/50 z-10" />
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="text-center">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={logoAltText || "Hero Logo"}
              width={500}
              height={500}
              className="mx-auto mb-8 w-80 h-80 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96"
              priority
            />
          )}
          <div className="space-x-4">
            {heroSection.cta1 && (
              <Link
                href={heroSection.cta1.href}
                className="rounded gold-gradient-bg px-5 py-2.5 sm:px-7 sm:py-3.5 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-[#262974]"
              >
                {heroSection.cta1.text}
              </Link>
            )}
            {heroSection.cta2 && (
              <Link
                href={heroSection.cta2.href}
                className="rounded border-2 border-white bg-transparent px-4 py-2 sm:px-6 sm:py-3 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#1E1E1E]"
              >
                {heroSection.cta2.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
