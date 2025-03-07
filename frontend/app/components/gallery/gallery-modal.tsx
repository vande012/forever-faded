"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryItem } from "../../../types/gallery"

// Add your Strapi URL here
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

interface GalleryModalProps {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (item: GalleryItem) => void
}

export function GalleryModal({ item, items, onClose, onNavigate }: GalleryModalProps) {
  // Function to get the full image URL
  const getImageUrl = (url: string | undefined) => {
    if (!url) return "/placeholder.svg"
    // If the URL already starts with http, return it as is
    if (url.startsWith("http")) return url
    // Otherwise, prepend the Strapi URL
    return `${STRAPI_URL}${url}`
  }

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
        {/* Improved container for the rotated image */}
        <div className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center">
          <div className="relative w-[85%] h-[85%] sm:w-[80%] sm:h-[80%]">
            <Image
              src={getImageUrl(item.Image?.url)}
              alt={item.Image?.alternativeText || item.Category || "Gallery image"}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain rotate-90"
              priority
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