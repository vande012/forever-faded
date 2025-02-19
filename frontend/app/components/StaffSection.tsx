"use client"

import Image from "next/image"
import { Button } from "../components/ui/button"
import { useHomepage } from "../contexts/HomepageContext"
import { getStrapiMedia, useStrapi} from "../hooks/useStrapi"

export default function StaffSection() {
  const { data, isLoading, error } = useStrapi("homepage", {
    populate: {
      staff: {
        populate: {
          photo: {
            populate: "*", // Populate all fields in the photo object
          },
        },
      },
    },
  });

  if (isLoading) return <div className="text-center text-white py-12">Loading team...</div>
  if (error) return <div className="text-center text-red-500 py-12">Error loading team: {error.message}</div>

  return (
    <section className="py-12 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold gold-gradient-text text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {data?.staff?.map((member) => {
            // Debugging: Log the member and photo object
            console.log("Member:", member)
            console.log("Photo Object:", member.photo)

            // Construct the image URL using the photo URL
            const imageUrl = member.photo?.url
              ? getStrapiMedia(member.photo.url)
              : member.photo?.formats?.thumbnail?.url
              ? getStrapiMedia(member.photo.formats.thumbnail.url)
              : null

            // Debugging: Log the constructed URL
            console.log("Constructed Image URL:", imageUrl)

            return (
              <div 
                key={member.id} 
                className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={member.photo?.alternativeText || member.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", imageUrl)
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No photo available</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg gold-gradient-text">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                  <p className="text-sm mb-4 text-white">{member.description}</p>
                  <Button className="w-full gold-gradient-bg">Book Now</Button>
                </div>
              </div>
            )
          })}
          
          {/* Hiring CTA Card */}
          <div className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col justify-center items-center p-8">
            <h3 className="text-3xl font-bold gold-gradient-text text-center mb-4">We are hiring!</h3>
            <p className="text-white text-center mb-6">Check out our open positions and apply today!</p>
            <Button className="gold-gradient-bg">Open positions</Button>
          </div>
        </div>
      </div>
    </section>
  )
}