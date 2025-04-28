"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from './ui/LoadingSpinner';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const GOOGLE_PLACE_ID = "ChIJa5PIEy2mBYgRyUJNl9KGx0c";
const REVIEWS_PER_PAGE = 3; // Show 3 reviews at a time on desktop

interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface PlaceData {
  rating: number;
  reviews: GoogleReview[];
  totalReviews: number;
}

const ReviewCard = React.memo(({ review }: { review: GoogleReview }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className="bg-white/10 p-6 rounded-lg shadow-lg h-full flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center mb-4 gap-4">
        <Image
          src={review.profile_photo_url}
          alt={review.author_name}
          width={48}
          height={48}
          className="rounded-full"
          loading="lazy"
        />
        <div>
          <div className="font-urbanist font-semibold text-lg text-white">
            {review.author_name}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i: number) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {review.relative_time_description}
            </span>
          </div>
        </div>
      </div>
      <p className={`font-roboto text-white ${expanded ? '' : 'line-clamp-4'} transition-all duration-300 flex-grow`}>
        {review.text}
      </p>
      {review.text.length > 200 && (
        <button 
          className="text-yellow-400 mt-2 text-sm font-medium hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

const Reviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [placeData, setPlaceData] = useState<PlaceData>({
    reviews: [],
    rating: 5.0,
    totalReviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calculate total pages based on reviews count
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Set up swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Try to get cached data first
        const cachedData = sessionStorage.getItem('reviewsData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          // Use all reviews without filtering by rating
          setReviews(parsedData.reviews);
          setPlaceData({
            ...parsedData,
            reviews: parsedData.reviews
          });
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/google-reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
  
        const data = await response.json();
        
        // Cache the data
        sessionStorage.setItem('reviewsData', JSON.stringify(data));
        
        // Use all reviews without filtering
        setReviews(data.reviews);
        
        setPlaceData({
          ...data,
          reviews: data.reviews
        });
  
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchReviews();
  }, []);

  // Create dots for pagination
  const renderPaginationDots = () => {
    return (
      <div className="flex justify-center gap-2 mt-6 mb-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-300 
            ${currentPage === index ? "w-6 bg-yellow-400" : "w-2 bg-gray-600"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Get current reviews to display
  const getCurrentReviews = () => {
    const startIndex = currentPage * REVIEWS_PER_PAGE;
    return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  };

  return (
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1D1D1D]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-urbanist text-6xl font-bold text-center mb-4 gold-gradient-text">
            What Our Clients Say
          </h2>

          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/google-logo.png"
                alt="Google Reviews"
                width={24}
                height={24}
                className="w-6 h-6"
                priority
              />
              <span className="text-white font-urbanist text-xl">Google Reviews</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i: number) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-white font-urbanist text-2xl font-bold">
                {placeData.rating.toFixed(1)}
              </span>
              <span className="text-gray-400">
                ({placeData.totalReviews} total reviews)
              </span>
            </div>

            <a
              href="https://g.page/r/CclCTZfShsdHEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 gold-gradient-bg text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Leave a Review on Google
            </a>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="relative max-w-6xl mx-auto">
              {/* Carousel navigation buttons */}
              <div className="absolute -left-5 md:-left-10 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={prevSlide}
                  className="p-2 md:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all ease-in-out duration-300 hover:scale-110"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-6 h-6 " />
                </button>
              </div>
              
              <div 
                {...swipeHandlers}
                className="overflow-hidden mx-auto"
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    ref={carouselRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                    key={currentPage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getCurrentReviews().map((review, index) => (
                      <ReviewCard key={`${review.author_name}-${index}`} review={review} />
                    ))}
                    
                    {/* Empty state */}
                    {reviews.length === 0 && (
                      <div className="text-center py-12 col-span-3">
                        <p className="text-gray-400 text-lg">No reviews found.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute -right-5 md:-right-10 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={nextSlide}
                  className="p-2 md:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all ease-in-out duration-300 hover:scale-110"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              {/* Pagination dots */}
              {reviews.length > REVIEWS_PER_PAGE && (
                <>
                  {renderPaginationDots()}
                  
                </>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href={`https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">Read all reviews on</span>
              <Image
                src="/google-logo.png"
                alt="Google"
                width={90}
                height={90}
                className="h-9 w-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>
  );
};

const ReviewsWithErrorBoundary = () => (
  <ErrorBoundary
    fallback={({ error, reset }) => (
      <div className="py-16 relative overflow-hidden bg-[#1D1D1D]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-white text-xl mb-4">Error loading reviews</h2>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <button 
              onClick={reset}
              className="px-6 py-2 gold-gradient-bg text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )}
  >
    <Reviews />
  </ErrorBoundary>
);

export default ReviewsWithErrorBoundary;