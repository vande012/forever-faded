"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from './ui/LoadingSpinner';
import { ErrorBoundary } from './ui/ErrorBoundary';
import LoadingSpinnerSmall from './ui/LoadingSpinnerSmall';

const GOOGLE_PLACE_ID = "ChIJa5PIEy2mBYgRyUJNl9KGx0c";
const REVIEWS_PER_PAGE = 6;

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

const ReviewCard = React.memo(({ review }: { review: GoogleReview }) => (
  <div className="bg-white/10 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
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
    <p className="font-roboto text-white line-clamp-4 hover:line-clamp-none transition-all duration-300">
      {review.text}
    </p>
  </div>
));

ReviewCard.displayName = 'ReviewCard';

const Reviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<GoogleReview[]>([]);
  const [placeData, setPlaceData] = useState<PlaceData>({
    reviews: [],
    rating: 5.0,
    totalReviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Try to get cached data first
        const cachedData = sessionStorage.getItem('reviewsData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setReviews(parsedData.reviews);
          setDisplayedReviews(parsedData.reviews.slice(0, REVIEWS_PER_PAGE));
          setPlaceData(parsedData);
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
        
        // Store all reviews
        setReviews(data.reviews);
        
        // Display first batch of reviews
        setDisplayedReviews(data.reviews.slice(0, REVIEWS_PER_PAGE));
        
        setPlaceData({
          reviews: data.reviews,
          rating: data.rating,
          totalReviews: data.totalReviews
        });

        setHasMore(data.reviews.length > REVIEWS_PER_PAGE);
  
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchReviews();
  }, []);
  
  const loadMore = React.useCallback(() => {
    setIsLoadingMore(true);
    
    const currentCount = displayedReviews.length;
    const nextBatch = reviews.slice(currentCount, currentCount + REVIEWS_PER_PAGE);
    
    if (nextBatch.length > 0) {
      setDisplayedReviews(prev => [...prev, ...nextBatch]);
      setHasMore(currentCount + nextBatch.length < reviews.length);
    } else {
      setHasMore(false);
    }
    
    setIsLoadingMore(false);
  }, [displayedReviews.length, reviews]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="py-16 relative overflow-hidden bg-[#1D1D1D]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-white text-xl mb-4">Error loading reviews</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 gold-gradient-bg text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedReviews.map((review: GoogleReview, index: number) => (
              <ReviewCard key={`${review.author_name}-${index}`} review={review} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 gold-gradient-bg text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {isLoadingMore ? (
                  <>
                     <LoadingSpinnerSmall />
                    <span>Loading...</span>
                  </>
                ) : (
                  'Load More Reviews'
                )}
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href={`https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>Read all reviews on</span>
              <Image
                src="/google-logo.png"
                alt="Google"
                width={60}
                height={20}
                className="h-5 w-auto"
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