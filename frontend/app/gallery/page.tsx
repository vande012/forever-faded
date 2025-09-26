import type { Metadata } from "next"
import GalleryGrid from "../components/gallery/gallery-grid"
import { GalleryHeader } from "../components/gallery/gallery-header"
import { getGalleryData } from "../data/loaders"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  title: "Gallery | Forever Faded",
  description: "Check out our latest haircuts and styles at Forever Faded Barber Shop in Waukesha, WI.",
  keywords: ["barber gallery", "haircut gallery", "fade haircuts", "Waukesha barber", "Forever Faded gallery"],
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  openGraph: {
    title: "Gallery | Forever Faded Barbershop",
    description: "Browse our collection of professional haircuts and styles at Forever Faded Barber Shop in Waukesha, WI.",
    url: `${siteUrl}/gallery`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/FFlogo.jpg`,
        width: 1200,
        height: 630,
        alt: "Forever Faded Barbershop Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Faded Barbershop Gallery",
    description: "Browse our collection of professional haircuts and styles at Forever Faded Barber Shop in Waukesha, WI.",
    images: [`${siteUrl}/FFlogo.jpg`],
  },
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
      <section className="container mx-auto px-4 py-12">
        <div className="text-gray-300 text-center max-w-3xl mx-auto mb-12 font-roboto">
          <p>{galleryData?.data?.Description || ""}</p>
        </div>
        
        {/* Show a message if no items are found */}
        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-gray-400 text-lg">No gallery items found. Please add some in your Strapi admin.</h2>
          </div>
        ) : (
          <GalleryGrid galleryItems={galleryItems} />
        )}
      </section>
    </main>
  )
}