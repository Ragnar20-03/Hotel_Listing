// pages/Admin/Reviews.tsx

import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsPage: React.FC = () => {
  // Sample review data
  const reviews = [
    {
      customerName: "John Doe",
      hotelName: "Ocean View Hotel",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      reviewDescription:
        "The hotel was fantastic! The staff was super friendly, and the views were amazing. Would definitely recommend to anyone visiting the area.",
      rating: 5,
      reviewDate: "2024-12-01",
    },
    {
      customerName: "Jane Smith",
      hotelName: "Mountain Escape Resort",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      reviewDescription:
        "The resort was peaceful and well-maintained. Loved the hiking trails nearby and the spa was top-notch.",
      rating: 4,
      reviewDate: "2024-11-15",
    },
    {
      customerName: "Sam Brown",
      hotelName: "City Center Inn",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      reviewDescription:
        "Good location, but the rooms were a bit smaller than expected. Still, it was a good stay overall.",
      rating: 3,
      reviewDate: "2024-10-28",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            customerName={review.customerName}
            hotelName={review.hotelName}
            profilePic={review.profilePic}
            reviewDescription={review.reviewDescription}
            rating={review.rating}
            reviewDate={review.reviewDate}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
