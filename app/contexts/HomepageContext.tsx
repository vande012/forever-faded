"use client";
// contexts/HomepageContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useStrapi } from '../hooks/useStrapi';

interface ServiceItem {
  id: string;
  subtitle: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  items?: ServiceItem[];
  description?: string;
}

interface ServicesData {
  services: ServiceCategory[];
}

interface HomepageData {
  Title: string;
  Logo: {
    url: string;
    alternativeText: string | null;
  };
  Video: {
    url: string;
  };
  Whyusheader: string;
  Whyussubheader: string;
  Whyustext: RichTextBlock[];
  Whyusimage: {
    url: string;
    alternativeText: string | null;
  };
  Reviews: Review[];
  ReviewsTitle: string;
  ReviewButton: ReviewButton;
  Services: ServicesData;
}

interface HomepageContextType {
  data: HomepageData | null;
  isLoading: boolean;
  error: Error | null;
}

interface RichTextBlock {
  type: string;
  children: Array<{
    type: string;
    text?: string;
    [key: string]: any;
  }>;
}

export type Review = {
  name: string;
  review: string;
  rating: number; // Assuming you include ratings
};

export type ReviewButton = {
  ButtonText: string;
  URL: string;
  ButtonText2: string;
  URL2: string;
};

export type ReviewsData = {
  reviewsTitle: string;
  reviews: Review[];
  reviewButton: ReviewButton;
};

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export function HomepageProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useStrapi<HomepageData>('homepage', {
    populate: '*'  // Changed from 'deep' to '*'
  });

  return (
    <HomepageContext.Provider value={{ data: data?.data || null, isLoading, error }}>
      {children}
    </HomepageContext.Provider>
  );
}

export function useHomepage() {
  const context = useContext(HomepageContext);
  if (context === undefined) {
    throw new Error('useHomepage must be used within a HomepageProvider');
  }
  return context;
}