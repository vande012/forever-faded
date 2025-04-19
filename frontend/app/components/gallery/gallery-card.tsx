"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { GalleryItem } from "../../../types/gallery"
import { getStrapiMedia } from "@/app/utils/get-strapi-url"

interface GalleryCardProps {
  item: GalleryItem
  index: number
  onClick: () => void
  imageOrientation?: 'auto' | 'portrait' | 'landscape' | 'rotate90' | 'rotate180' | 'rotate270'
}

export function GalleryCard({ item, index, onClick, imageOrientation = 'auto' }: GalleryCardProps) {
  const [orientation, setOrientation] = useState<string>("unknown")
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
    
    // If manual orientation is provided, use it
    if (imageOrientation !== 'auto') {
      setOrientation(imageOrientation);
      return;
    }
    
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
      <div className={`relative ${
        isRotated ? 'aspect-square' :
        orientation === "portrait" ? "aspect-[3/4]" : 
        orientation === "landscape" ? "aspect-[4/3]" : 
        "aspect-square"
      } overflow-hidden`}>
        <Image
          src={getImageUrl(item.Image)}
          alt={item.Image?.alternativeText || item.Category || "Gallery image"}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${getOrientationClass()} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit: "cover" }}
          onLoadingComplete={() => setIsLoaded(true)}
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