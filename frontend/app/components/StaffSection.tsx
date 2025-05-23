"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { getHomepageData } from "../data/loaders";
import { getStrapiMedia } from "../utils/get-strapi-url";
import Link from "next/link";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CareerApplicationModal } from "./CareerApplicationModal";

const placeholderCard = {
  id: 'placeholder',
  name: 'We are hiring!',
  title: 'Check out our open positions and apply today!',
  cta: {
    text: 'Apply Now',
    href: '#'
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

// Career Application Modal Component has been moved to its own file

export default function StaffSection() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to get the correct barber bio link
  const getBarberBioLink = (name: string) => {
    // Map staff names to the IDs used in StaffProfile
    const nameToIdMap: Record<string, string> = {
      'Timothy': 'tim',
      'Timothy L Retic SR': 'tim',
      'Tim': 'tim',
      'Angel': 'angel',
      'Brian': 'brian',
      'Bryan': 'brian',
      'Christian': 'christian',
      'Cristian': 'christian',
      'Chelsea': 'chelsea',
      'Megan': 'megan',
      'Juan': 'juan',
      'Davy': 'davy',
    };
    
    // Get the mapped ID or fallback to lowercase name
    const barberId = nameToIdMap[name] || name.toLowerCase().replace(/\s+/g, '-');
    
    // Using the full URL pattern to ensure proper navigation
    return `/staff#barber-${barberId}`;
  };

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

  if (isLoading) return <div className="h-screen w-full bg-black flex text-white font-roboto font-bold text-2xl items-center justify-center">
    <div className="container flex flex-col items-center justify-center">
            <Image
              src="/loadinganimation.gif"
              alt="Loading..."
              width={200}
              height={200}
              priority
              unoptimized
             />
       <div className="text-center col-span-2">Loading...</div>
       </div>
    </div>;
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

  // Handle hiring card click
  const handleHiringCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
                  className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] hover:shadow-lg hover:shadow-[#D3A84C]/20 transition-all duration-300"
                >
                  {member.id === 'placeholder' ? (
                    <div className="p-4 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                      <h3 className="font-bold text-2xl gold-gradient-text mb-4">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-6">{member.title}</p>
                      <Button className="w-full gold-gradient-bg" onClick={handleHiringCardClick}>
                        {member.cta.text}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="relative bg-black">
                        <Image
                          src={imageUrl}
                          alt={member.name || "Staff member"}
                          width={300}
                          height={300}
                          className={`w-full h-56 sm:h-64 object-cover ${
                            member.name === "Tim" ? "mobile-tim-position" : 
                            member.name === "Bryan" ? "mobile-bryan-position" :
                            member.name === "Juan" ? "mobile-juan-position" : 
                            member.name === "Cristian" ? "mobile-cristian-position" : 
                            member.name === "Chelsea" ? "mobile-chelsea-position" :
                            member.name === "Angel" ? "mobile-angel-position" :
                            member.name === "Davy" ? "mobile-davy-position" :
                            ""
                          }`}
                          style={{
                            objectPosition: member.name === "Tim" ? "center -100px" : 
                                          member.name === "Bryan" ? "center -60px" :
                                          member.name === "Juan" ? "center -70px" : 
                                          member.name === "Cristian" ? "center -80px" : 
                                          member.name === "Chelsea" ? "center -140px" :
                                          member.name === "Angel" ? "center -50px" :
                                          member.name === "Davy" ? "center -60px" :
                                          "top"
                          }}
                          unoptimized={imageUrl.endsWith('.svg')}
                        />
                      </div>
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
                        <div className="flex flex-col space-y-2">
                          {member.cta && (
                            <a href={member.cta.href} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full gold-gradient-bg text-white font-medium">
                                {member.cta.text}
                              </Button>
                            </a>
                          )}
                          
                          {/* Add Read Bio Button */}
                          <Link 
                            href={getBarberBioLink(member.name)} 
                            className="w-full"
                            scroll={true}
                            prefetch={true}
                          >
                            <Button className="w-full gold-border-btn font-medium">
                              Read Bio
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Career Application Modal */}
      <CareerApplicationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}