"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";
import { useHomepage } from "../contexts/HomepageContext";
import RichTextRenderer from "./RichTextRenderer";

const BarberServicesSection = () => {
  const { data, isLoading, error } = useHomepage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="bg-[#1D1D1D] min-h-[400px] p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-7xl font-bold gold-gradient-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {data.Whyusheader}
            </motion.h2>

            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold">
                {data.Whyussubheader}
              </h3>
              <div className="text-gray-400">
                <RichTextRenderer richText={data.Whyustext} />
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
                  <CountUp end={17} duration={3} suffix="+" />
                </span>
                <p className="text-sm text-white">YEARS OF EXPERIENCE</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] lg:h-[500px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data.Whyusimage.url}`}
              alt={data.Whyusimage.alternativeText || "Why Us Image"}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberServicesSection;