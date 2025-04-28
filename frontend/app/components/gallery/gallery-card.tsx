"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { GalleryItem } from "../../../types/gallery"
import { getStrapiMedia } from "@/app/utils/get-strapi-url"

export type ImageOrientation = 'auto' | 'portrait' | 'landscape' | 'square' | 'rotate90' | 'rotate180' | 'rotate270' | 'unknown';

interface GalleryCardProps {
  item: GalleryItem
  index: number
  onClick: () => void
  imageOrientation?: ImageOrientation
}

// Function to detect images that need rotation based on URL patterns
export const detectImageRotation = (url: string | null): ImageOrientation => {
  if (!url) return 'auto';
  
  // Add specific image filenames that need rotation
  // Rotate 90 degrees clockwise
  if (
    url.includes('20230817_170228_e8f4ed11a7.jpg') ||
    url.includes('20230817_161947_a78dd97649.jpg') ||
    url.includes('20230817_161702_f52387162a.jpg') ||
    url.includes('DSC_0419_aa4cbdb5f3.JPG') ||
    url.includes('DSC_0423_7af79a7cd8.JPG') ||
    url.includes('20230817_161136_58fe0bfccc.jpg') ||
    url.includes('20230817_161756_51658e0096.jpg') ||
    url.includes('20230817_162745_5130036a77.jpg') ||
    url.includes('20230817_164734_acfb160cf5.jpg') ||
    url.includes('20230817_172948_379b1101ed.jpg') ||
    url.includes('20230817_173149_f48366221a.jpg') ||
    url.includes('20231103_171443_885963269c.jpg') ||
    url.includes('DSC_03621_e2a89c2354.JPG') ||
    url.includes('E78576_F8_88_C7_4_F13_8993_7814_C19_B2088_4567c8b248.jpeg')
  ) {
    return 'rotate90';
  }
  
  // Rotate 270 degrees clockwise (or 90 counter-clockwise)
  if (
    url.includes('DSC_02306_6b32e163e3.jpg') ||
    url.includes('DSC_03821_477cecff57.JPG') ||
    url.includes('DSC_0322_be11f85cb8.JPG') ||
    url.includes('DSC_0382_c5f58ae9e2.JPG')
  ) {
    return 'rotate270';
  }
  
  // Rotate 180 degrees
  if (
    url.includes('DSC_0118_4c5f5e8c93.JPG') ||
    url.includes('DSC_0120_75e73b72a9.JPG')
  ) {
    return 'rotate180';
  }
  
  return 'auto';
};

export function GalleryCard({ item, index, onClick, imageOrientation = 'auto' }: GalleryCardProps) {
  const [orientation, setOrientation] = useState<ImageOrientation>("unknown")
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Function to get the full image URL
  const getImageUrl = (image: any) => {
    if (!image || !image.url) return "/placeholder.svg"
    return getStrapiMedia(image.url)
  }

  // Effect to handle image loading and orientation detection
  useEffect(() => {
    if (!item.Image || !item.Image.url) {
      setOrientation("unknown");
      return;
    }
    
    // Check if this specific image has a known rotation issue - this should always be checked first
    const detectedRotation = detectImageRotation(item.Image.url);
    
    // If rotation is detected or manually specified, use it
    if (detectedRotation !== 'auto') {
      setOrientation(detectedRotation);
      return;
    } else if (imageOrientation !== 'auto') {
      setOrientation(imageOrientation);
      return;
    }
    
    // If no rotation is specified, determine orientation based on dimensions
    // Initial orientation guess based on metadata (if available)
    if (item.Image.width && item.Image.height) {
      if (item.Image.width > item.Image.height) {
        setOrientation("landscape");
      } else if (item.Image.height > item.Image.width) {
        setOrientation("portrait");
      } else {
        setOrientation("square");
      }
    } else {
      // If no dimensions in metadata, load the image to check
      const img = new globalThis.Image();
      img.onload = () => {
        if (img.width > img.height) {
          setOrientation("landscape");
        } else if (img.height > img.width) {
          setOrientation("portrait");
        } else {
          setOrientation("square");
        }
      };
      img.onerror = () => {
        setOrientation("unknown");
      };
      img.src = getStrapiMedia(item.Image.url);
    }
  }, [item.Image, imageOrientation]);

  // Get orientation class for rotated images
  const getOrientationClass = () => {
    switch (orientation) {
      case 'rotate90':
        return 'rotate-90';
      case 'rotate180':
        return 'rotate-180';
      case 'rotate270':
        return '-rotate-90';
      default:
        return '';
    }
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  }

  // Determine if we should use a rotation or aspect ratio based approach
  const isRotated = ['rotate90', 'rotate180', 'rotate270'].includes(orientation);
  
  // Determine if image should be lazy loaded based on its position
  // First 4 images are considered "above the fold" and should not be lazy loaded
  const shouldLazyLoad = index >= 4;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Responsive aspect ratio container based on orientation */}
      <div 
        className={`relative ${
          isRotated ? 'aspect-square' :
          orientation === "portrait" ? "aspect-[3/4]" : 
          orientation === "landscape" ? "aspect-[4/3]" : 
          "aspect-square"
        } overflow-hidden`}
        aria-label={item.Category || "Gallery image"}
      >
        <Image
          src={getImageUrl(item.Image)}
          alt={item.Image?.alternativeText || item.Category || "Gallery image"}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${getOrientationClass()} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit: "cover" }}
          onLoadingComplete={() => setIsLoaded(true)}
          loading={shouldLazyLoad ? "lazy" : "eager"}
          fetchPriority={shouldLazyLoad ? "auto" : "high"}
        />
        
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          {/* Only show category on hover */}
          <div className="p-6 w-full">
            <span className="px-4 py-2 text-sm font-medium rounded-full gold-gradient-bg text-black font-roboto inline-block">
              {item.Category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}