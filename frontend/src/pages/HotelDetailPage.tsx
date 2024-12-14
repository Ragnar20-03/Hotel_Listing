import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelImageSlider from "../components/HotelImageSlider";
import BookingCard from "../components/BookingCard";
import CustomerReviews from "../components/CustomerReviews";
import Amenities from "../components/Amenities";
import HotelOwnerInfo from "../components/HotelOwnerInfo";
import axios from "axios";

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    console.log("id is : ", id);

    axios
      .get(`http://localhost:5100/api/v1/user/get-hotel/${id}`)
      .then((res1: any) => {
        console.log("res1 is : ", res1);

        setHotel(res1.data.hotel);
        console.log("hotel is : ", hotel.name);

        console.log("images : ", hotel.images);
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
          <CustomerReviews hotelId={hotel._id} />
        </div>
        <div>
          <BookingCard hotel={hotel} />
          <HotelOwnerInfo owner={hotel.owner} />
        </div>
      </div>
    </div>
  );
}
