import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { DatePickerWithRange } from "./ui/DatePickerWithRange";

type dateType = {
  from: string | any;
  to: string | any;
};

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<dateType>({
    from: undefined,
    to: undefined,
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/explore?destination=${destination}&from=${dateRange.from}&to=${dateRange.to}`
    );
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D)",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-55 rounded-md bg-https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D" />
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
        <p className="text-xl">Discover amazing hotels at unbeatable prices</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full sm:w-64"
          />
          {/* <DatePickerWithRange value={dateRange} onChange={setDateRange} /> */}
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
    </section>
  );
}
