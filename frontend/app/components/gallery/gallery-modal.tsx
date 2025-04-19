"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryItem } from "../../../types/gallery"
import { getStrapiMedia } from "@/app/utils/get-strapi-url"

// Function to detect images that need rotation based on URL patterns
const detectImageRotation = (url: string | null) => {
  if (!url) return 'auto';
  
  // Add specific image filenames that need rotation
  if (url.includes('20230817_170228_e8f4ed11a7.jpg')) {
    return 'rotate90';
  }
  if (url.includes('DSC_02306_6b32e163e3.jpg')) {
    return 'rotate270';
  }
  if (url.includes('DSC_03821_477cecff57.JPG')) {
    return 'rotate270';
  }
  // Add more problematic images as needed
  // if (url.includes('another_filename.jpg')) {
  //   return 'rotate270';
  // }
  
  return 'auto';
};

interface GalleryModalProps {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (item: GalleryItem) => void
  imageOrientation?: 'auto' | 'portrait' | 'landscape' | 'rotate90' | 'rotate180' | 'rotate270'
}

export function GalleryModal({ item, items, onClose, onNavigate, imageOrientation = 'auto' }: GalleryModalProps) {
  const [orientation, setOrientation] = useState<string>("unknown")
  const [isLoading, setIsLoading] = useState(true)
  
  // Function to get the full image URL
  const getImageUrl = (image: any) => {
    if (!image || !image.url) return "/placeholder.svg"
    return getStrapiMedia(image.url)
  }

  // Effect to handle image loading and orientation detection
  useEffect(() => {
    setIsLoading(true);
    
    if (!item.Image || !item.Image.url) {
      setOrientation("unknown");
      setIsLoading(false);
      return;
    }

    // Check if this specific image has a known rotation issue
    const detectedRotation = detectImageRotation(item.Image.url);
    
    // If a specific rotation is manually provided or detected, use it
    if (imageOrientation !== 'auto') {
      setOrientation(imageOrientation);
      setIsLoading(false);
      return;
    } else if (detectedRotation !== 'auto') {
      setOrientation(detectedRotation);
      setIsLoading(false);
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
      setIsLoading(false);
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
        setIsLoading(false);
      };
      img.onerror = () => {
        setOrientation("unknown");
        setIsLoading(false);
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

  // Determine if we should use a rotation or aspect ratio based approach
  const isRotated = ['rotate90', 'rotate180', 'rotate270'].includes(orientation);
  
  const currentIndex = items.findIndex((i) => i.id === item.id)

  const navigateToImage = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length

      return items[newIndex]
    },
    [currentIndex, items],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") {
        const nextItem = navigateToImage("next")
        onNavigate(nextItem)
      }
      if (e.key === "ArrowLeft") {
        const prevItem = navigateToImage("prev")
        onNavigate(prevItem)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [navigateToImage, onClose, onNavigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl max-h-[95vh] bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container with adaptive sizing based on orientation */}
        <div className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-gold-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className={`relative ${
            isRotated ? 'w-[70%] h-[70%] sm:w-[65%] sm:h-[65%]' :
            orientation === "portrait" ? "w-[60%] h-[85%] sm:w-[50%] sm:h-[90%]" : 
            orientation === "landscape" ? "w-[85%] h-[65%] sm:w-[90%] sm:h-[70%]" : 
            "w-[75%] h-[75%] sm:w-[70%] sm:h-[70%]"
          }`}>
            <Image
              src={getImageUrl(item.Image)}
              alt={item.Image?.alternativeText || item.Category || "Gallery image"}
              fill
              unoptimized
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
              className={`object-contain transition-opacity duration-300 ${getOrientationClass()} ${isLoading ? "opacity-0" : "opacity-100"}`}
              priority
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              const prevItem = navigateToImage("prev")
              onNavigate(prevItem)
            }}
            className="p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              const nextItem = navigateToImage("next")
              onNavigate(nextItem)
            }}
            className="p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Minimal info overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4">
          <span className="px-3 py-1 text-sm font-medium rounded-full gold-gradient-bg text-black font-roboto inline-block">
            {item.Category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}