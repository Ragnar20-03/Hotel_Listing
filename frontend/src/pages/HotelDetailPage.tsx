import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelImageSlider from "../components/HotelImageSlider";
import BookingCard from "../components/BookingCard";
import CustomerReviews from "../components/CustomerReviews";
import Amenities from "../components/Amenities";
import HotelOwnerInfo from "../components/HotelOwnerInfo";

interface Hotel {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  stars: number;
  location: string;
  amenities: string[];
  owner: {
    name: string;
    image: string;
    description: string;
  };
}

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setHotel({
      id: 1,
      name: "Luxury Resort",
      description: "Experience ultimate luxury in our beachfront resort.",
      images: [
        "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
      ],
      price: 250,
      stars: 5,
      location: "Maldives",
      amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Gym"],
      owner: {
        name: "John Smith",
        image: "/placeholder.svg?height=100&width=100",
        description:
          "Passionate hotelier with 20 years of experience in luxury hospitality.",
      },
    });
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HotelImageSlider images={hotel.images} />
          <p className="mt-4 text-gray-600">{hotel.description}</p>
          <Amenities amenities={hotel.amenities} />
          <CustomerReviews hotelId={hotel.id} />
        </div>
        <div>
          <BookingCard hotel={hotel} />
          <HotelOwnerInfo owner={hotel.owner} />
        </div>
      </div>
    </div>
  );
}
