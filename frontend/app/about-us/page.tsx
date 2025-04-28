import type { Metadata } from "next";
import AboutUsContent from './AboutUsContent';
import { getAboutPageHours } from "../data/loaders";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  title: "About Us | Forever Faded Barbershop",
  description: "Learn about Forever Faded Barbershop, a premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services.",
  alternates: {
    canonical: `${siteUrl}/about-us`,
  },
  openGraph: {
    title: "About Us | Forever Faded Barbershop",
    description: "Learn about Forever Faded Barbershop, a premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services.",
    type: "website",
    url: `${siteUrl}/about-us`,
    images: [
      {
        url: `${siteUrl}/hero-logo.png`,
        width: 1200,
        height: 630,
        alt: "Forever Faded Barbershop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Forever Faded Barbershop",
    description: "Learn about Forever Faded Barbershop in Waukesha, WI",
    images: [`${siteUrl}/hero-logo.png`],
  },
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

interface Block {
  __component: string;
  hours?: Array<{
    Day: string;
    Open: string;
    Close: string;
  }>;
}

interface HomepageData {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: Block[];
  };
  meta: Record<string, unknown>;
}

export default async function AboutUs() {
    try {
        const response = await getAboutPageHours();
        const homepageData = response as HomepageData;
        
        if (!homepageData?.data?.blocks) {
            return (
                <div className="flex flex-col min-h-screen bg-black text-white">
                    <div className="container mx-auto px-4 py-8 pt-[160px]">
                        <h1 className="text-4xl font-bold gold-gradient-text">About Forever Faded</h1>
                        <p className="mt-4 text-gray-300">Content unavailable</p>
                    </div>
                </div>
            );
        }

        const hoursBlock = homepageData.data.blocks.find(
            (block: Block) => block.__component === "blocks.hours"
        );

        const hours = hoursBlock?.hours || [];

        return <AboutUsContent hours={{ hours }} />;
    } catch (error) {
        console.error('Error in AboutUs page:', error);
        return (
            <div className="flex flex-col min-h-screen bg-black text-white">
                <div className="container mx-auto px-4 py-8 pt-[160px]">
                    <h1 className="text-4xl font-bold gold-gradient-text">About Forever Faded</h1>
                    <p className="mt-4 text-gray-300">Unable to load content</p>
                </div>
            </div>
        );
    }
}