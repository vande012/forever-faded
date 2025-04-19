"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getHomepageData } from "../data/loaders";
import { getStrapiMedia } from "../utils/get-strapi-url";

interface WhyUsBlock {
  __component: "blocks.why-us";
  id: number;
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  };
  header: string;
  subheader: string;
  description: string;
}

interface HomepageData {
  id: number;
  blocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function WhyUs() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    );

    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
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

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-black flex text-white font-roboto font-bold text-2xl items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <Image
          src="/loadinganimation.gif"
          alt="Loading..."
          width={200}
          height={200}
          priority
        />
        <div className="text-center col-span-2">Loading...</div>
      </div>
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

  const isWhyUsSectionBlock = (block: any): block is WhyUsBlock => {
    return block?.__component === "blocks.why-us";
  };

  const whyUsSection = data?.blocks?.find(isWhyUsSectionBlock);

  if (!whyUsSection) {
    return <div className="bg-[#1D1D1D] min-h-[400px] p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-6 gold-gradient-text">Why Choose Forever Faded</h2>
        <p className="text-gray-400">Loading content...</p>
      </div>
    </div>;
  }

  const imageUrl = whyUsSection.image
    ? getStrapiMedia(whyUsSection.image.url)
    : null;
  const imageAltText = whyUsSection.image?.alternativeText || "Why Choose Forever Faded";

  const subheaderText = whyUsSection?.subheader || "Default Subheader";
  const descriptionText = whyUsSection?.description || "Default Description";


  return (
    <div className="bg-[#1D1D1D] min-h-[400px] p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {whyUsSection.header && (
              <motion.h2
                className="text-3xl md:text-4xl lg:text-7xl font-bold gold-gradient-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {whyUsSection.header}
              </motion.h2>
            )}

            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold">
                {whyUsSection.subheader}
              </h3>
              <div className="text-gray-400">
                {whyUsSection.description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-5xl font-bold gold-gradient-text">
                  <CountUp end={99} duration={3} suffix="%" />
                </span>
                <p className="text-sm text-white">CUSTOMER SATISFACTION</p>
              </div>
              <div className="space-y-2">
                <span className="text-5xl font-bold text-white gold-gradient-text">
                  <CountUp end={50} duration={4} suffix="+" />
                </span>
                <p className="text-sm text-white">COMBINED YEARS OF EXPERIENCE</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] lg:h-[500px]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAltText || "Why Us Image"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
