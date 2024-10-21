import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setTestimonials([
      {
        id: 1,
        name: "John Doe",
        image: "/placeholder.svg?height=100&width=100",
        text: "Amazing experience! The hotel exceeded all my expectations.",
      },
      {
        id: 2,
        name: "Jane Smith",
        image: "/placeholder.svg?height=100&width=100",
        text: "Fantastic service and beautiful accommodations. Will definitely return!",
      },
      {
        id: 3,
        name: "Mike Johnson",
        image: "/placeholder.svg?height=100&width=100",
        text: "The staff was incredibly helpful and the amenities were top-notch.",
      },
    ]);
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Guests Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 mb-4">{testimonial.text}</p>
            <p className="font-semibold text-center">{testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
