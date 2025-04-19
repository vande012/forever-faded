import type { Metadata } from "next"
import GalleryGrid from "../components/gallery/gallery-grid"
import { GalleryHeader } from "../components/gallery/gallery-header"
import { getGalleryData } from "../data/loaders"

export const metadata: Metadata = {
  title: "Gallery | Forever Faded",
  description: "Check out our latest haircuts and styles at Forever Faded Barber Shop",
}

export default async function GalleryPage() {
  const galleryData = await getGalleryData();
  
  // Debug: Log the gallery data structure
  console.log("Gallery Data:", JSON.stringify(galleryData, null, 2));
  
  // Check if gallery_items exists and is an array
  const galleryItems = galleryData?.data?.gallery_items || [];
  
  // Debug: Log the number of items found
  console.log(`Found ${galleryItems.length} gallery items`);
  
  return (
    <main className="min-h-screen bg-black pt-24">
      <GalleryHeader />
      <div className="container mx-auto px-4 py-12">
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 font-roboto">
          {galleryData?.data?.Description || ""}
        </p>
        
        {/* Show a message if no items are found */}
        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No gallery items found. Please add some in your Strapi admin.</p>
          </div>
        ) : (
          <GalleryGrid galleryItems={galleryItems} />
        )}
      </div>
    </main>
  )
}