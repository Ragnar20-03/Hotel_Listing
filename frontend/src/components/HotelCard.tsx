import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axios from "axios";

export function HotelCards() {
  const [hotels, setHotels] = useState<any>([]);

  // useEffect(() => {
  //   // In a real application, you would fetch this data from an API
  //   setHotels([
  //     {
  //       id: 1,
  //       name: "Luxury Resort",
  //       image:
  //         "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww",
  //       price: 250,
  //       stars: 5,
  //       location: "Maldives",
  //     },
  //     {
  //       id: 2,
  //       name: "City View Hotel",
  //       image:
  //         "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fHww",
  //       price: 150,
  //       stars: 4,
  //       location: "New York",
  //     },
  //     {
  //       id: 3,
  //       name: "Mountain Retreat",
  //       image: "/placeholder.svg?height=300&width=400",
  //       price: 180,
  //       stars: 4,
  //       location: "Swiss Alps",
  //     },
  //     // Add more hotels as needed
  //   ]);
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5100/api/v1/user/get-hotel")
      .then((res1: any) => {
        setHotels(res1.data.hotels);
      })
      .catch((err: any) => {
        console.log("error is ; ", err);
      });
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Our Hotels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel: any) => (
          <motion.div
            key={hotel.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Link to={`/hotel/${hotel._id}`}>
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-2">{hotel.location}</p>
                <div className="flex items-center mb-2">
                  {Array.from({ length: hotel.stars }).map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg font-bold">${hotel.price} / night</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
