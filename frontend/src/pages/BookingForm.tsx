import React, { useState } from "react";

interface BookingFormProps {
  hotel: {
    name: string;
    location: string;
    contactInfo: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ hotel }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "single", // Default room type
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Room type price multipliers
  const roomTypeMultipliers: Record<string, number> = {
    single: 1, // Base price
    double: 1.5, // 50% more
    suite: 2, // Double the price
  };

  // Calculate total price
  const calculateTotalPrice = (updatedFormData: typeof formData) => {
    const checkInDate = new Date(updatedFormData.checkIn);
    const checkOutDate = new Date(updatedFormData.checkOut);

    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
      const nights =
        (checkOutDate.getTime() - checkInDate.getTime()) /
        (1000 * 60 * 60 * 24);
      const basePrice = 1000; // Base price per night per guest
      const roomMultiplier = roomTypeMultipliers[updatedFormData.roomType];
      setTotalPrice(
        nights * basePrice * updatedFormData.guests * roomMultiplier
      );
    } else {
      setTotalPrice(0); // Reset total price if dates are invalid
    }
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    };
    setFormData(updatedFormData);
    calculateTotalPrice(updatedFormData);
  };

  return (
    <div className="m-3 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Hotel Booking Form
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            "Booking confirmed! Details: " + JSON.stringify(formData, null, 2)
          );
        }}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Check-In Date */}
        <div>
          <label
            htmlFor="checkIn"
            className="block text-sm font-medium text-gray-700"
          >
            Check-In Date
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Check-Out Date */}
        <div>
          <label
            htmlFor="checkOut"
            className="block text-sm font-medium text-gray-700"
          >
            Check-Out Date
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min={1}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Room Type */}
        <div>
          <label
            htmlFor="roomType"
            className="block text-sm font-medium text-gray-700"
          >
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        {/* Total Price */}
        <div className="text-lg font-medium text-gray-700">
          Total Price:{" "}
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
