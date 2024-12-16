import { useState } from "react";
// import { DatePickerWithRange } from "./ui/DatePickerWithRange";
import { Button } from "./ui/Button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookingCardProps {
  hotel: {
    _id: any;
    price: number;
    stars: number;
  };
}

export default function BookingCard({ hotel }: BookingCardProps) {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [guests, setGuests] = useState(1);

  const navigate = useNavigate();
  const handleBooking = () => {
    // Implement booking logic here
    navigate(`/booking/${hotel._id}`);

    console.log("Booking:", { dateRange, guests });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">${hotel.price} / night</h2>
      <div className="flex items-center mb-4">
        {Array.from({ length: hotel.stars }).map((_, index) => (
          <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      {/* <DatePickerWithRange value={dateRange} onChange={setDateRange} /> */}
      <div className="mt-4">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Guests
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleBooking} className="w-full mt-6">
        Book Now
      </Button>
    </div>
  );
}
