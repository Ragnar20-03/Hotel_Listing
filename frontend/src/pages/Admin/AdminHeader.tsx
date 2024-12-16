// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookie } from "../Hooks";
import { TestTube } from "lucide-react";

const AdminHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const { getCookie, removeCookie } = useCookie();
  useEffect(() => {
    if (getCookie("token")) {
      setIsLoggedIn(true);
      //   window.location.reload();
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      removeCookie("token");
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md m-4 p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-semibold">
              Hotel Admin
            </Link>
          </div>

          {/* Centering navigation links */}
          <div className="flex-1 flex justify-center space-x-6 md:flex md:space-x-4">
            {/* <Link
              to="/admin/hotels"
              className="text-white hover:text-indigo-200"
            >
              Hotels
            </Link> */}
            <Link
              to="/admin/reviews"
              className="text-white hover:text-indigo-200"
            >
              Reviews
            </Link>
            <div className="relative">
              {isLoggedIn ? (
                <button
                  onClick={handleLoginLogout}
                  className="text-white hover:text-indigo-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-white hover:text-indigo-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/admin/hotels"
              className="block text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium "
            >
              Hotels
            </Link>
            <Link
              to="/admin/reviews"
              className="block text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Reviews
            </Link>
            <div className="relative">
              {isLoggedIn ? (
                <button
                  onClick={handleLoginLogout}
                  className="block text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="block text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminHeader;
