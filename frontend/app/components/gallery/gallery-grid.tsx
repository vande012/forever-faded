"use client"

import { useState, useEffect } from "react"
import { GalleryModal } from "./gallery-modal"
import { GalleryCard } from "./gallery-card"
import type { GalleryItem } from "../../../types/gallery"

interface GalleryGridProps {
  galleryItems: GalleryItem[]
}

export default function GalleryGrid({ galleryItems }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])

  // Filter gallery items by category
  useEffect(() => {
    const items = filter === "all" 
      ? galleryItems 
      : galleryItems.filter(item => item.Category?.toLowerCase() === filter.toLowerCase());
    
    setFilteredItems(items);
  }, [filter, galleryItems]);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(galleryItems.filter(item => item.Category).map(item => item.Category.toLowerCase()))];

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === category 
                ? "gold-gradient-bg text-black" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery grid - UPDATED: fewer columns for bigger images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {filteredItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No gallery items found in this category.</p>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          items={galleryItems}
          onClose={() => setSelectedItem(null)}
          onNavigate={(item) => setSelectedItem(item)}
        />
      )}
    </div>
  )
}