"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { useStrapi, getStrapiMedia } from "../hooks/useStrapi";
import qs from 'qs';

interface Photo {
  id: number;
  url: string;
  formats: {
    thumbnail?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    large?: { url: string };
  };
}

interface StaffMember {
  id: number;
  name: string;
  title: string;
  description: string;
  buttontext: string;
  buttonurl: string;
  photo?: Photo;
}

interface Staff {
  id: number;
  staff_members: StaffMember[];
}

interface StaffSectionItem {
  id: number;
  SectionTitle: string;
  staff: Staff[];
}

interface HomepageData {
  StaffSection: StaffSectionItem[];
}
//qs is a library that helps to convert objects into query strings
//it is used to populate the nested relationships in the Strapi API
//the query string is then passed to the useStrapi hook to fetch the data
export default function StaffSection() {
  const query = qs.stringify(
    {
      populate: {
        StaffSection: {
          populate: {
            staff: {
              populate: {
                staff_members: {
                  populate: 'photo',
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  //the useStrapi hook is used to fetch the data from the Strapi API
  const { data, isLoading, error } = useStrapi<HomepageData>(`homepage?${query}`);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading staff section</div>;
  if (!data || !data.data.StaffSection.length) return null;
  //the data is fetched from the Strapi API and the first staff section is selected
  const staffSection = data.data.StaffSection[0];
  

  return (
    <section className="py-12 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold gold-gradient-text text-center mb-8">
          {staffSection.SectionTitle || "Meet Our Team"}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {staffSection.staff[0]?.staff_members.map((member) => {
            const imageUrl = member.photo?.formats?.medium?.url
              ? getStrapiMedia(member.photo.formats.medium.url)
              : member.photo?.url
              ? getStrapiMedia(member.photo.url)
              : null;

            return (
              <div
                key={member.id}
                className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={member.name || "Staff member"}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", imageUrl);
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No photo available</span>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-bold text-lg gold-gradient-text">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                  <p className="text-sm mb-4 text-white">{member.description}</p>

                  {member.buttontext && member.buttonurl && (
                    <a href={member.buttonurl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full gold-gradient-bg">
                        {member.buttontext}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* Hiring CTA Card */}
          <div className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col justify-center items-center p-8">
            <h3 className="text-3xl font-bold gold-gradient-text text-center mb-4">
              We are hiring!
            </h3>
            <p className="text-white text-center mb-6">
              Check out our open positions and apply today!
            </p>
            <Button className="gold-gradient-bg">Open Positions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
