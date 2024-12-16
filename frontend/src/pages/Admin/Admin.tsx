import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react"; // Using Lucide React icons for Login and SignUp
import { Footer } from "react-day-picker";
import { useCookie } from "../Hooks";

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { getCookie } = useCookie();
  useEffect(() => {
    if (getCookie("token")) {
      navigate("/admin/dashboard");
    }
  }, []);
  const handleOnLogin = () => {
    navigate("/admin/login");
  };

  const handleSignin = () => {
    navigate("/admin/signin");
  };

  return (
    <div className="h-auto   flex flex-col items-center justify-start bg-gray-50">
      {/* Buttons Section with slight margin top */}
      <div className="space-y-4 mt-12 mb-6">
        {" "}
        {/* Changed mt-12 to adjust the buttons upwards */}
        <button
          onClick={handleOnLogin}
          className="w-full sm:w-64 py-3 px-4 bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </button>
        <button
          onClick={handleSignin}
          className="w-full sm:w-64 py-3 px-4 bg-green-500 text-white rounded-lg flex items-center justify-center space-x-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300"
        >
          <UserPlus className="w-5 h-5" />
          <span>Sign Up</span>
        </button>
      </div>

      {/* Heading Section */}
      <Footer />
    </div>
  );
};
