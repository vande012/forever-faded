"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Suspense } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { HairIcon, BeardIcon, SpecialtyIcon, MilitaryIcon } from './ui/icons';
import { getHomepageData } from '../data/loaders';
import Script from 'next/script';

const BOOKING_URL = "https://getsquire.com/booking/book/forever-faded-llc-waukesha";
const CACHE_KEY = 'services-data';

interface ServiceItem {
  id: number;
  name: string;
  description: string | null;
  cost?: string;  
  time?: string;  
}

interface ServiceBlock {
  __component: "blocks.service-section";
  id: number;
  service: ServiceItem[];
  service1: ServiceItem[];
  service2: ServiceItem[];
  category: string;
  category1: string;
  category2: string;
}

interface HomepageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: any[];
}

// JSON-LD Schema for services
const ServicesSchema = ({ data }: { data: ServiceBlock | null }) => {
  if (!data) return null;
  
  // Function to create service offers for schema
  const createServiceOffers = (services: ServiceItem[], category: string) => {
    return services.map(service => ({
      "@type": "Service",
      "@id": `https://foreverfadedmke.com/services#${service.id}`,
      "name": service.name,
      "description": service.description || "",
      "serviceType": category,
      ...(service.cost && { 
        "offers": {
          "@type": "Offer",
          "price": service.cost,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": BOOKING_URL
        }
      }),
    }));
  };

  // Combine all services
  const allServices = [
    ...createServiceOffers(data.service || [], data.category || 'Face & Beard Services'),
    ...createServiceOffers(data.service1 || [], data.category1 || 'Hair Services'),
    ...createServiceOffers(data.service2 || [], data.category2 || 'Specialty Services')
  ];

  // Create schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": "https://foreverfadedmke.com/#organization",
    "name": "Forever Faded Barbershop",
    "url": "https://foreverfadedmke.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://foreverfadedmke.com/hero-logo.png",
      "width": "512",
      "height": "512"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://foreverfadedmke.com/hero-logo.png",
      "width": "1200",
      "height": "630"
    },
    "telephone": "+12628964247",
    "description": "Premier barbershop in Waukesha, WI offering professional haircuts, beard trims, and grooming services for all hair types and styles.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1300 E Moreland Blvd",
      "addressLocality": "Waukesha",
      "addressRegion": "WI",
      "postalCode": "53186",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.03266693114752,
      "longitude": -88.19823762328094
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "@id": "https://foreverfadedmke.com/services#catalog",
      "name": "Barbershop Services",
      "itemListElement": allServices
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "15:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "00:00",
        "closes": "00:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/foreverfaded",
      "https://www.instagram.com/foreverfadedmke" 
    ]
  };

  return (
    <Script id="services-schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
};

const ServiceCard = React.memo(({ item }: { item: ServiceItem }) => (
  <a 
    href={BOOKING_URL} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block space-y-2 border-b border-gray-800 pb-3 hover:bg-gray-900/30 transition-colors duration-200 rounded-md p-2 cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <h3 className="font-urbanist text-lg text-white">
        {item.name}
      </h3>
      {item.cost && (
        <span className="font-urbanist text-lg text-[#D3A84C]">
          ${item.cost}
        </span>
      )}
    </div>
    <div className="flex justify-between">
      <p className="font-roboto text-sm text-gray-400">
        {item.description}
      </p>
      {item.time && (
        <span className="font-roboto text-sm text-gray-400">
          {item.time}
        </span>
      )}
    </div>
  </a>
));

ServiceCard.displayName = 'ServiceCard';

function ServicesContent() {
  const [data, setData] = useState<ServiceBlock | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getHomepageData();
      console.log('Raw homepage response:', response);

      // Debug logs
      if (!response?.data) {
        console.error('Response has no data property');
        throw new Error('Invalid response structure');
      }

      // Access blocks directly from data
      if (!Array.isArray(response.data.blocks)) {
        console.error('Blocks is not an array:', response.data);
        throw new Error('Invalid response structure: blocks is not an array');
      }

      // Find the service section block
      const serviceBlock = response.data.blocks.find(
        (block: any): block is ServiceBlock => block.__component === "blocks.service-section"
      );

      console.log('Found service block:', serviceBlock);

      if (!serviceBlock) {
        throw new Error('Service section not found in blocks');
      }

      // Validate the service block structure
      if (!serviceBlock.service || !serviceBlock.service1 || !serviceBlock.service2) {
        console.error('Invalid service block structure:', serviceBlock);
        throw new Error('Invalid service block structure');
      }

      setData(serviceBlock);
    } catch (err) {
      console.error("Error fetching homepage data:", err);
      setError(err instanceof Error ? err : new Error('Failed to load services'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="w-full py-12 bg-black flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-16 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-white text-xl mb-4">Unable to load services</h2>
            <p className="text-gray-400 mb-6">{error?.message || 'Please try again'}</p>
            <Button 
              onClick={fetchData}
              className="gold-gradient-bg text-black hover:opacity-90 transition-all duration-300"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-black">
      {/* Add Schema.org JSON-LD markup */}
      <ServicesSchema data={data} />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Face & Beard Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <HairIcon />
              <h2 className="text-2xl md:text-2xl font-urbanist font-bold text-white">
                {data.category || 'Face & Beard Services'}
              </h2>
            </div>
            <div className="space-y-4">
              {data.service?.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Hair Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
            <BeardIcon />
              <h2 className="text-2xl md:text-2xl font-urbanist font-bold text-white">
                {data.category1 || 'Hair Services'}
              </h2>
            </div>
            <div className="space-y-4">
              {data.service1?.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Specialty Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <SpecialtyIcon />
              <h2 className="text-2xl md:text-2xl font-urbanist font-bold text-white">
                {data.category2 || 'Specialty Services'}
              </h2>
            </div>
            <div className="space-y-4">
              {data.service2?.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Military & First Responder Discount */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#C6A55C]/10 via-[#E3CC88]/10 to-[#C6A55C]/10 rounded-lg border border-[#C6A55C]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <MilitaryIcon />
              <div>
                <h2 className="font-urbanist text-2xl font-bold text-white bg-clip-text">
                  Military | First Responder | Senior Discount
                </h2>
                <p className="font-roboto text-sm text-gray-400">
                  Special pricing for our service members, first responders, and Seniors.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => window.open(BOOKING_URL, '_blank')}
              className="gold-gradient-bg text-black hover:opacity-90 transition-all duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400 font-roboto">
          Pricing varies based on stylist rates*
        </p>
      </div>
    </section>
  );
}

// Wrap with ErrorBoundary
export default function ServicesSection() {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="py-16 relative overflow-hidden bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-white text-xl mb-4">Something went wrong</h2>
              <p className="text-gray-400 mb-6">{error.message}</p>
              <Button 
                onClick={reset}
                className="gold-gradient-bg text-black hover:opacity-90 transition-all duration-300"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    >
      <ServicesContent />
    </ErrorBoundary>
  );
}