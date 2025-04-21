"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import BackToTop with no SSR since it depends on window
const BackToTop = dynamic(() => import('./BackToTop'), { ssr: false });

export default function BackToTopWrapper() {
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <BackToTop />;
} 