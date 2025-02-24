"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { getHomepageData } from "../data/loaders";
import { getStrapiURL } from "../utils/get-strapi-url";

const placeholderCard = {
  id: 'placeholder',
  name: 'We are hiring!',
  title: 'Check out our open positions and apply today!',
  cta: {
    text: 'Open positions',
    href: '/careers'
  }
};

export default function StaffSection() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageData = await getHomepageData();
        const staffBlock = homepageData.data.blocks.find(
          (block: any) => block.__component === "blocks.staff-section"
        );
        setData(staffBlock);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading staff section</div>;

  return (
    <section className="py-12 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold gold-gradient-text text-center mb-8">
          {data.title || "Meet Our Team"}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {[...data.staffcard, placeholderCard].map((member: any) => {
            const imageUrl = member.image?.url 
              ? `${getStrapiURL()}${member.image.url}`
              : "/placeholder.svg";

            return (
              <div
                key={member.id}
                className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
              >
                {member.id === 'placeholder' ? (
                  <div className="p-4 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <h3 className="font-bold text-2xl gold-gradient-text mb-4">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">{member.title}</p>
                    <Button className="w-full gold-gradient-bg">
                      {member.cta.text}
                    </Button>
                  </div>
                ) : (
                  <>
                    <Image
                      src={imageUrl}
                      alt={member.name || "Staff member"}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg gold-gradient-text">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-400">{member.title}</p>
                      <p className="text-sm mb-4 text-white">{member.description}</p>
                      {member.cta && (
                        <a href={member.cta.href} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full gold-gradient-bg">
                            {member.cta.text}
                          </Button>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}