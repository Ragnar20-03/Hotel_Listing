import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import AddRoomModal from "./AddRoomModal";

interface AddHotelModalProps {
  onClose: () => void;
  onAddHotel: (hotelData: any) => void; // Function to handle adding new hotel
  currentHotel?: any; // Optional prop to handle editing an existing hotel
}

const AddHotelModal: React.FC<AddHotelModalProps> = ({
  onClose,
  onAddHotel,
  currentHotel,
}) => {
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [hotelData, setHotelData] = useState({
    name: "",
    location: "",
    description: "",
    amenities: "",
    policies: "",
    contactInfo: "",
    images: [] as File[],
  });

  // If there's a current hotel being edited, populate the form with the hotel data
  useEffect(() => {
    if (currentHotel) {
      setHotelData(currentHotel);
    }
  }, [currentHotel]);

  // Handle changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file changes for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setHotelData((prevData) => ({
        ...prevData,
        images: Array.from(e.target.files as FileList),
      }));
    }
  };

  // Submit the form (either add a new hotel or update an existing one)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(hotelData).forEach(([key, value]) => {
      if (key === "images") {
        //@ts-ignore
        value.forEach((image: File) => formData.append("images", image));
      } else {
        // @ts-ignore
        formData.append(key, value);
      }
    });

    try {
      const url = currentHotel
        ? `/api/hotels/${currentHotel.id}`
        : "/api/hotels";
      const method = currentHotel ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        console.log(
          currentHotel
            ? "Hotel Updated Successfully"
            : "Hotel Added Successfully"
        );
        onAddHotel(hotelData); // Call the parent callback to update the hotels list
        onClose(); // Close the modal
      } else {
        console.error("Error submitting hotel:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {currentHotel ? "Edit Hotel" : "Add New Hotel"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form for adding or editing hotel */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={hotelData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Other input fields */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={hotelData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={hotelData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="amenities"
              className="block text-sm font-medium text-gray-700"
            >
              Amenities
            </label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={hotelData.amenities}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="policies"
              className="block text-sm font-medium text-gray-700"
            >
              Policies
            </label>
            <textarea
              id="policies"
              name="policies"
              value={hotelData.policies}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="contactInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Info
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={hotelData.contactInfo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowRoomModal(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Room
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentHotel ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>
        </form>
      </div>

      {/* Room Modal */}
      {showRoomModal && (
        <AddRoomModal onClose={() => setShowRoomModal(false)} />
      )}
    </div>
  );
};

export default AddHotelModal;
