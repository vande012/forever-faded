'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PromoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {children}
    </div>
  );
} 