"use client";

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const BarberServicesSection = () => {
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
              Expert Barber
              <br />
              Services in Waukesha
            </motion.h2>
            
            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold">Why Choose Us?</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur. Diam elementum nunc nequa da et
                argu sed fringilla cursus. Bibendum et pet pellentesque vitae duis amet.
                Lorem ipsum dolor sit amet consectetur. Diam elementum nunc nequa da et
                argu sed fringilla cursus. Bibendum et pet pellentesque vitae duis amet.
                <br></br>
                Lorem ipsum dolor sit amet consectetur. Diam elementum nunc nequa da et
                argu sed fringilla cursus. Bibendum et pet pellentesque vitae duis amet.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-5xl font-bold gold-gradient-text">
                  <CountUp end={99} duration={2} suffix='%'/>
                </span>
                <p className="text-sm text-white">CUSTOMER SATISFACTION</p>
              </div>
              <div className="space-y-2">
                <span className="text-5xl font-bold text-white gold-gradient-text">
                  <CountUp end={19} duration={2} suffix="+" />
                </span>
                <p className="text-sm text-white">YEARS OF EXPERIENCE</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] lg:h-[500px]">
            <img
              src="whyus.jpg"
              alt="Barber Service"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberServicesSection;