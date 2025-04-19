"use client"

import { useState, useEffect } from "react"
import { GalleryModal } from "./gallery-modal"
import { GalleryCard } from "./gallery-card"
import type { GalleryItem } from "../../../types/gallery"

interface GalleryGridProps {
  galleryItems: GalleryItem[]
  isAdmin?: boolean
}

// Map to store manual orientation overrides
// In a production app, you might want to store this in a database
const imageOrientations: Record<string, 'auto' | 'portrait' | 'landscape' | 'rotate90' | 'rotate180' | 'rotate270'> = {
  // Example: "image-1": "rotate90", 
  // You can add more entries here based on image IDs or URLs
};

// Helper function to get orientation override based on the image URL or ID
const getImageOrientation = (item: GalleryItem) => {
  if (!item.Image) return 'auto';
  
  // Check if we have an orientation for this specific image ID
  if (imageOrientations[`${item.id}`]) {
    return imageOrientations[`${item.id}`];
  }
  
  // Check if we have an orientation based on image URL
  const url = item.Image.url;
  if (url && imageOrientations[url]) {
    return imageOrientations[url];
  }
  
  return 'auto';
};

// Store orientations in localStorage to persist between page refreshes
const saveOrientations = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('image-orientations', JSON.stringify(imageOrientations));
  }
};

// Load orientations from localStorage on first render
const loadOrientations = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('image-orientations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(imageOrientations, parsed);
      } catch (e) {
        console.error('Failed to parse saved orientations', e);
      }
    }
  }
};

export default function GalleryGrid({ galleryItems, isAdmin = false }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [showOrientationTools, setShowOrientationTools] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Load saved orientations on first render
  useEffect(() => {
    if (!initialized) {
      loadOrientations();
      setInitialized(true);
    }
  }, [initialized]);

  // Filter gallery items by category
  useEffect(() => {
    const items = filter === "all" 
      ? galleryItems 
      : galleryItems.filter(item => item.Category?.toLowerCase() === filter.toLowerCase());
    
    setFilteredItems(items);
  }, [filter, galleryItems]);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(galleryItems.filter(item => item.Category).map(item => item.Category.toLowerCase()))];

  // Function to update image orientation
  const updateOrientation = (itemId: number, orientation: 'auto' | 'portrait' | 'landscape' | 'rotate90' | 'rotate180' | 'rotate270') => {
    imageOrientations[`${itemId}`] = orientation;
    saveOrientations();
    // Force re-render
    setFilteredItems([...filteredItems]);
  };

  // Toggle for admin tools
  const toggleOrientationTools = () => {
    setShowOrientationTools(!showOrientationTools);
  };

  return (
    <div className="space-y-8">
      {/* Admin controls - only visible with isAdmin flag */}
      {isAdmin && (
        <div className="bg-zinc-800 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium">Admin Controls</h3>
            <button 
              onClick={toggleOrientationTools}
              className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white"
            >
              {showOrientationTools ? 'Hide Orientation Tools' : 'Show Orientation Tools'}
            </button>
          </div>
          
          {showOrientationTools && (
            <div className="mt-4 border-t border-zinc-700 pt-4">
              <p className="text-gray-300 text-sm mb-4">Select any image that needs rotation corrected:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {filteredItems.map((item) => (
                  <div key={`admin-${item.id}`} className="space-y-2">
                    <div className="relative w-full aspect-square overflow-hidden rounded">
                      <img 
                        src={item.Image?.url} 
                        alt={item.Category || "Gallery image"} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <select 
                      className="w-full bg-zinc-700 text-white text-xs p-1 rounded"
                      value={getImageOrientation(item)}
                      onChange={(e) => updateOrientation(
                        item.id, 
                        e.target.value as 'auto' | 'portrait' | 'landscape' | 'rotate90' | 'rotate180' | 'rotate270'
                      )}
                    >
                      <option value="auto">Auto Detect</option>
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                      <option value="rotate90">Rotate 90°</option>
                      <option value="rotate180">Rotate 180°</option>
                      <option value="rotate270">Rotate 270°</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
            imageOrientation={getImageOrientation(item)}
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
          imageOrientation={getImageOrientation(selectedItem)}
        />
      )}
    </div>
  )
}