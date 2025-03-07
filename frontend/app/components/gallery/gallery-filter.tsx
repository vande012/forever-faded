"use client"

import { motion } from "framer-motion"

interface GalleryFilterProps {
  activeFilter: string
  setFilter: (filter: string) => void
}

export function GalleryFilter({ activeFilter, setFilter }: GalleryFilterProps) {
  const filters = [
    { id: "all", label: "All Styles" },
    { id: "fade", label: "Fades" },
    { id: "taper", label: "Tapers" },
    { id: "beard", label: "Beard Trims" },
    { id: "design", label: "Designs" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={`px-4 py-2 rounded-full font-roboto text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.id ? "gold-gradient-bg text-black" : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  )
}

