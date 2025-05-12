'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PromoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black to-gray-900" />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#d4af37] opacity-10 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#d4af37] opacity-10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-[#d4af37] opacity-10 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Main content with animation */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
          {children}
        </Suspense>
      </motion.div>
    </div>
  );
} 