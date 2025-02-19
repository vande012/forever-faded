"use client";

import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useHomepage, Review } from "../contexts/HomepageContext";

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
                i < review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="font-roboto text-white">{review.review}</p>
  </div>
);

const Reviews = () => {
  const { data, isLoading, error } = useHomepage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading content</div>;
  }

  const { ReviewsTitle, Reviews, ReviewButton } = data;

 // Updated error check to include URL2 and ButtonText2
 if (!ReviewButton || !ReviewButton.URL || !ReviewButton.ButtonText || !ReviewButton.URL2 || !ReviewButton.ButtonText2) {
  return <div>Error: ReviewButton data is missing or incomplete</div>;
}

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1D1D1D]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-urbanist text-6xl font-bold text-center mb-12 gold-gradient-text">
          {ReviewsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
        <div className="space-x-4 pt-8 flex justify-center">
          <Link
            href={ReviewButton.URL}
            className="rounded gold-gradient-bg px-5 py-2.5 sm:px-7 sm:py-3.5 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-[#262974]"
          >
            {ReviewButton.ButtonText}
          </Link>
          <Link
            href={ReviewButton.URL2}
            className="rounded border-2 border-white bg-transparent px-4 py-2 sm:px-6 sm:py-3 font-roboto text-base sm:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#1E1E1E]"
          >
            {ReviewButton.ButtonText2}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;