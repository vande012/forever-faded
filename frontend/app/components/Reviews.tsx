"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { getHomepageData } from "../data/loaders";

// Define the Review type
interface Review {
  name: string;
  body: string;
  stars: number;
}

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white/10 p-6 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <div>
        <h3 className="font-urbanist font-semibold text-lg text-white">
          {review.name}
        </h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.stars
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="font-roboto text-white">{review.body}</p>
  </div>
);

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageData = await getHomepageData();
        const reviewsBlock = homepageData.data.blocks.find(
          (block: any) => block.__component === "blocks.reviews"
        );
        setReviewsData(reviewsBlock.review);
      } catch (err) {
        setError(err);
        console.error("Error fetching homepage data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !reviewsData) {
    return <div>Error loading content</div>;
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1D1D1D]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-urbanist text-6xl font-bold text-center mb-12 gold-gradient-text">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review: Review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
