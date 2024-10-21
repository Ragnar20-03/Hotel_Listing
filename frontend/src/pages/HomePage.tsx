import HeroSection from "../components/HeroSection";
import { HotelCards } from "../components/HotelCard";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      <HeroSection />
      <HotelCards />
      <Testimonials />
    </div>
  );
}
