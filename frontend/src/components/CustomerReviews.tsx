import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface CustomerReviewsProps {
  hotelId: number;
}

export default function CustomerReviews({ hotelId }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setReviews([
      {
        id: 1,
        user: "Alice",
        rating: 5,
        comment:
          "Excellent stay! The staff was very friendly and the room was spotless.",
        date: "2024-03-15",
      },
      {
        id: 2,
        user: "Bob",
        rating: 4,
        comment:
          "Great location and amenities. The breakfast could be improved.",
        date: "2024-03-10",
      },
      {
        id: 3,
        user: "Charlie",
        rating: 5,
        comment: "Absolutely loved my stay here. Will definitely come back!",
        date: "2024-03-05",
      },
    ]);
  }, [hotelId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">{review.user}</p>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-2">{review.comment}</p>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
      ))}
    </div>
  );
}
