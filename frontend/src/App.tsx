import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelDetailPage from "./pages/HotelDetailPage";
import { ExploreHotelsPage } from "./pages/ExploreHotelsPage";
import Header from "./components/ui/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotel/:id" element={<HotelDetailPage />} />
            <Route path="/explore" element={<ExploreHotelsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
