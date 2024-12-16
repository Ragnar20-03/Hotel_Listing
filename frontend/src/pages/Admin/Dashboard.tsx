import React, { useEffect, useState } from "react";
import AddRoomModal from "./AddRoomModal";
import AddHotelModal from "./AddHotelModal";
import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  amenities: string;
  contactInfo: string;
  images: File[];
}

const Dashboard: React.FC = () => {
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]); // Holds hotel data
  const [currentHotel, setCurrentHotel] = useState<Hotel | null>(null); // Holds current hotel for editing

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5100/api/v1/admin/get-hotel", {
          withCredentials: true,
        })
        .then((res1: any) => {
          console.log("res1 is : ", res1);
          setHotels(res1.data.hotels.hotels);
        })
        .catch((err1) => {
          console.log("error is : ", err1);
        });
    } catch (err) {
      console.log("error has been Ocuured", err);
    }
  }, []);
  // Handle opening the Add Hotel modal
  const handleAddHotel = () => {
    setShowHotelModal(true);
  };

  // Handle opening the Add Room modal
  const handleAddRoom = () => {
    setShowRoomModal(true);
  };

  // Handle closing the Room modal
  const handleCloseRoomModal = () => {
    setShowRoomModal(false);
  };

  // Handle closing the Hotel modal
  const handleCloseHotelModal = () => {
    setShowHotelModal(false);
  };

  // Add a new hotel to the list
  const addHotel = (hotelData: Hotel) => {
    setHotels([...hotels, hotelData]);
  };

  // Delete a hotel by its ID
  const deleteHotel = (id: number) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  // Edit a hotel
  const editHotel = (hotel: Hotel) => {
    setCurrentHotel(hotel);
    setShowHotelModal(true);
  };

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-2xl font-bold">125</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">$50,000</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold">Hotel Reviews</h2>
          <p className="text-2xl font-bold">4.5/5</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleAddHotel}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Hotel
        </button>
      </div>

      {/* Add Hotel Modal */}
      {showHotelModal && (
        <AddHotelModal
          onClose={handleCloseHotelModal}
          onAddHotel={addHotel}
          currentHotel={currentHotel}
        />
      )}

      {/* Add Room Modal */}
      {showRoomModal && <AddRoomModal onClose={handleCloseRoomModal} />}

      {/* Registered Hotels Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Registered Hotels</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Hotel Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 &&
              hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="px-4 py-2 border">{hotel.name}</td>
                  <td className="px-4 py-2 border">{hotel.location}</td>
                  <td className="px-4 py-2 border">{hotel.description}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => editHotel(hotel)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHotel(hotel.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleAddRoom}
                      className="bg-green-500 text-white py-1 px-2 rounded-md ml-2"
                    >
                      Add Room
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
