import { Check } from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
}

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
      <ul className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span>{amenity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
