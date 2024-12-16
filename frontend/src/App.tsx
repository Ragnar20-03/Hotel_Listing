import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelDetailPage from "./pages/HotelDetailPage";
import { ExploreHotelsPage } from "./pages/ExploreHotelsPage";
import Header from "./components/ui/Header";
// import AdminHeader from "./components/ui/AdminHeader"; // Import Admin header
import Footer from "./components/Footer";
import Login from "./pages/Admin/Login";
import { Admin } from "./pages/Admin/Admin";
import Dashboard from "./pages/Admin/Dashboard";
import AdminHeader from "./pages/Admin/AdminHeader";
import { Signal } from "lucide-react";
import Signin from "./pages/Admin/Signin";
import ReviewsPage from "./pages/Admin/ReviewsPage";
import { AuthGuard } from "./pages/Admin/AuthGuard/AuthGuard";
import { NotFound } from "./pages/NotFound";
import BookingCard from "./components/BookingCard";
import BookingForm from "./pages/BookingForm";
import ErrorBoundary from "./ErrorBoundray";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Header based on the route */}
        <Routes>
          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <>
                <AdminHeader />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<Signin />} />
                    {/* <Route element={<AuthGuard />}> */}
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Add other private admin routes here */}
                    {/* </Route> */}
                    <Route path="/*" element={<NotFound />} />
                  </Routes>
                </main>
              </>
            }
          />

          {/* Non-admin routes */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hotel/:id" element={<HotelDetailPage />} />
                    <Route path="/explore" element={<ExploreHotelsPage />} />
                    <Route path="/booking/:hid" element={<BookingForm />} />
                    {/* Add more non-admin routes here */}
                  </Routes>
                </main>
              </>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        {/* Footer is always displayed */}
        <Footer />
      </div>
    </Router>
  );
}
