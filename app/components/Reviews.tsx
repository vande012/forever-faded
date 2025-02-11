import { Star } from "lucide-react";

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    text: "Incredible experience at Forever Faded! The attention to detail and skill of the barbers is unmatched. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Smith",
    text: "I've been coming to Forever Faded for years, and they never disappoint. Always leave feeling confident and looking sharp!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Johnson",
    text: "Great atmosphere, friendly staff, and top-notch service. It's more than just a haircut - it's an experience!",
    rating: 4,
  },
];

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
    <p className="font-roboto text-white">{review.text}</p>
  </div>
);

const Reviews = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1D1D1D]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-urbanist text-6xl font-bold text-center mb-12 gold-gradient-text">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
