"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getHomepageData } from "../data/loaders";
import { getStrapiMedia } from "../utils/get-strapi-url";

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
  mobilevideo: {
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
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);


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

    // Update video source when isMobile changes
    useEffect(() => {
      if (videoRef.current && data) {
        const heroSection = data.blocks.find(isHeroSectionBlock);
        if (heroSection) {
          // Reload the video when source changes
          videoRef.current.load();
        }
      }
    }, [isMobile, data]);

  if (isLoading) {
    return (
    <section className="h-screen w-full bg-black flex text-white font-roboto font-bold text-2xl items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <Image
          src="/loadinganimation.gif"
          alt="Loading..."
          width={200}
          height={200}
          priority
          unoptimized
        />
        <div className="text-center col-span-2">Loading...</div>
      </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="h-screen bg-black flex text-white items-center justify-center">
        <h2>Error loading content</h2>
      </section>
    );
  }

  const isHeroSectionBlock = (block: any): block is HeroSectionBlock => {
    return block.__component === "blocks.hero";
  };

  const heroSection = data.blocks.find(isHeroSectionBlock);

  if (!heroSection) {
    return <section><h2>Hero section not found</h2></section>;
  }

  // Get the full URLs for media
  const logoUrl = heroSection.logo ? getStrapiMedia(heroSection.logo.url) : null;
  const desktopVideoUrl = heroSection.video ? getStrapiMedia(heroSection.video.url) : null;
  const mobileVideoUrl = heroSection.mobilevideo ? getStrapiMedia(heroSection.mobilevideo.url) : '/mobile-hero.mp4';
  
  const videoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {videoUrl && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover z-0"
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute top-0 left-0 h-full w-full bg-black/50 z-10" aria-hidden="true" />
      
      {/* Content container - centered on desktop, bottom-aligned on mobile */}
      <div className={`relative z-20 flex h-full ${isMobile ? 'items-end pb-16' : 'items-center'} justify-center`}>
        <div className="text-center">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={heroSection.logo?.alternativeText || "Forever Faded Logo"}
              width={600}
              height={600}
              className={`mx-auto ${isMobile ? 'mb-6 w-64 h-64' : 'mb-8 w-80 h-80 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96'}`}
              priority
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 600px"
            />
          )}
          <div className={`${isMobile ? 'flex flex-col space-y-4 space-x-0' : 'space-x-4'}`}>
            {heroSection.cta1 && (
              <Link
                href={heroSection.cta1.href}
                className={`rounded gold-gradient-bg font-roboto font-semibold text-white ${
                  isMobile ? 'block w-64 mx-auto px-5 py-2.5 text-base' : 'inline-block px-5 py-2.5 sm:px-7 sm:py-3.5 text-base sm:text-lg'
                }`}
              >
                {heroSection.cta1.text}
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}