import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { HotelCards } from "../components/HotelCard";

export function ExploreHotelsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    destination: searchParams.get("destination") || "",
    dateFrom: searchParams.get("from") || "",
    dateTo: searchParams.get("to") || "",
  });

  useEffect(() => {
    // In a real application, you would use these filters to fetch hotels from an API
    console.log("Filters:", filters);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Our Hotels</h1>
      {/* Add filter components here if needed */}
      <HotelCards />
    </div>
  );
}
