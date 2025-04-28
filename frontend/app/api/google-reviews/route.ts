import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

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

interface GooglePlacesResponse {
  result: {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
  };
  status: string;
}

// Cache the Google Places API call
const getGooglePlacesData = unstable_cache(
    async (GOOGLE_API_KEY: string, PLACE_ID: string) => {
      // Make multiple requests to get more reviews
      const requests = [
        new URLSearchParams({
          place_id: PLACE_ID,
          key: GOOGLE_API_KEY,
          fields: 'rating,user_ratings_total,reviews',
          reviews_sort: 'newest',
          reviews_no_translations: 'true',
          language: 'en'
        }),
        new URLSearchParams({
          place_id: PLACE_ID,
          key: GOOGLE_API_KEY,
          fields: 'reviews',
          reviews_sort: 'most_relevant',
          reviews_no_translations: 'true',
          language: 'en'
        })
      ];
  
      const responses = await Promise.all(
        requests.map(params => 
          fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`)
        )
      );
  
      const results = await Promise.all(
        responses.map(async response => {
          if (!response.ok) {
            throw new Error(`Google API error: ${response.status}`);
          }
          return response.json() as Promise<GooglePlacesResponse>;
        })
      );
  
      // Combine reviews from both requests
      const combinedReviews = results.reduce((acc, curr) => {
        if (curr.status === 'OK' && curr.result?.reviews) {
          acc.push(...curr.result.reviews);
        }
        return acc;
      }, [] as GoogleReview[]);
  
      // Remove duplicates based on time field
      const uniqueReviews = Array.from(
        new Map(combinedReviews.map(review => [review.time, review])).values()
      );
  
      return {
        status: 'OK',
        result: {
          reviews: uniqueReviews,
          rating: results[0].result.rating,
          user_ratings_total: results[0].result.user_ratings_total
        }
      };
    },
    ['google-places-data'],
    {
      revalidate: 43200, // Cache for 12 hours
      tags: ['reviews']
    }
  );
  
  export async function GET() {
    try {
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      const PLACE_ID = "ChIJa5PIEy2mBYgRyUJNl9KGx0c";
  
      if (!GOOGLE_API_KEY) {
        throw new Error('API key not configured');
      }
  
      // Use the cached function
      const data = await getGooglePlacesData(GOOGLE_API_KEY, PLACE_ID);
  
      if (data.status !== 'OK' || !data.result) {
        throw new Error('Invalid response from Google API');
      }
  
      // Log raw reviews count
      console.log('Total raw reviews:', data.result.reviews.length);
  
      // Filter reviews to only include those with text
      // Note: API will only return 5 reviews maximum
      const filteredReviews = (data.result.reviews || [])
        .filter((review: GoogleReview) => {
          const isValid = 
            review.text && 
            review.text.trim().length > 0;
          
          // Debug log for each review
          console.log(`Review from ${review.author_name}: rating=${review.rating}, hasText=${!!review.text}, isValid=${isValid}`);
          
          return isValid;
        })
        .sort((a, b) => b.time - a.time); // Sort by newest first
  
      console.log('Filtered reviews count:', filteredReviews.length);
  
      // Make sure to include all reviews we can get (maximum 5 from Google API)
      const response = {
        reviews: filteredReviews,
        rating: data.result.rating || 0,
        totalReviews: data.result.user_ratings_total || 0
      };
  
      console.log('Final response:', {
        reviewCount: response.reviews.length,
        rating: response.rating,
        totalReviews: response.totalReviews
      });
  
      // Cache the response
      return new NextResponse(
        JSON.stringify(response),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400'
          }
        }
      );
  
    } catch (error) {
      console.error('Error in Google Reviews API:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }
  }