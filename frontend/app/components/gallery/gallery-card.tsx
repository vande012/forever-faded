"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { GalleryItem } from "../../../types/gallery"

// Add your Strapi URL here
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

interface GalleryCardProps {
  item: GalleryItem
  index: number
  onClick: () => void
}

export function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  // Function to get the full image URL
  const getImageUrl = (image: any) => {
    if (!image) return "/placeholder.svg"
    // If the URL already starts with http, return it as is
    if (image.url.startsWith("http")) return image.url
    // Otherwise, prepend the Strapi URL
    return `${STRAPI_URL}${image.url}`
  }

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* UPDATED: Larger aspect ratio for bigger images */}
      <div className="relative aspect-[3/3] overflow-hidden">
        <Image
          src={getImageUrl(item.Image)}
          alt={item.Image?.alternativeText || item.Category || "Gallery image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 rotate-90"
          style={{ objectPosition: "center" }}
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