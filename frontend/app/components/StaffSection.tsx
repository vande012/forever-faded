"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { getHomepageData } from "../data/loaders";
import { getStrapiMedia } from "../utils/get-strapi-url";

const placeholderCard = {
  id: 'placeholder',
  name: 'We are hiring!',
  title: 'Check out our open positions and apply today!',
  cta: {
    text: 'Open positions',
    href: '/careers'
  }
};

// Social media icon components
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const TiktokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm10-9v5a4 4 0 0 1-4 4h-1v-2a4 4 0 0 0-4-4H8V2h8a3 3 0 0 1 3 3z"></path>
    <path d="M12 12v8"></path>
    <path d="M16 8v8"></path>
  </svg>
);

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

   // Function to render the appropriate social media icon
   const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon />;
      case 'facebook':
        return <FacebookIcon />;
      case 'twitter':
      case 'x':
        return <TwitterIcon />;
      case 'tiktok':
        return <TiktokIcon />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold gold-gradient-text text-center mb-8">
          {data.title || "Meet Our Team"}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {[...data.staffcard, placeholderCard].map((member: any) => {
            const imageUrl = member.image?.url ? getStrapiMedia(member.image.url) : "/placeholder.svg";

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
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg gold-gradient-text">
                          {member.name}
                        </h3>
                        
                        {/* Social Media Icons moved here */}
                        {member.socials && member.socials.length > 0 && (
                          <div className="flex space-x-2">
                            {member.socials.map((social: any, index: number) => (
                              <a 
                                key={index}
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#D3A84C] transition-colors"
                                aria-label={`${social.platform} profile`}
                              >
                                {renderSocialIcon(social.platform)}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      
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