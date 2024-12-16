// components/ReviewCard.tsx

import React from "react";

interface ReviewCardProps {
  customerName: string;
  hotelName: string;
  profilePic: string;
  reviewDescription: string;
  rating: number;
  reviewDate: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  customerName,
  hotelName,
  profilePic,
  reviewDescription,
  rating,
  reviewDate,
}) => {
  // Helper function to display the correct number of stars for the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-3.867 2.034 1.047-4.39-3.375-2.923 4.45-.391L10 5.5l1.745 4.83 4.45.391-3.375 2.923 1.047 4.39L10 15z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={profilePic}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{customerName}</p>
          <p className="text-sm text-gray-500">{hotelName}</p>
        </div>
      </div>
      <p className="text-gray-700">{reviewDescription}</p>
      <div className="flex items-center space-x-2">
        <div className="flex">{renderStars()}</div>
        <p className="text-sm text-gray-500">{reviewDate}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
