import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleGetOtp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5100/api/v1/admin/get-otp",
  //       {
  //         email: formData.email,
  //         password: formData.password,
  //       }
  //     );

  //     if (response.status === 200) {
  //       setShowOtpField(true);
  //     }
  //   } catch (error) {
  //     console.error("Error getting OTP:", error);
  //   }
  // };

  // const handleVerifyOtp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       formDataToSend.append(key, value);
  //     });
  //     if (profilePicture) {
  //       formDataToSend.append("file", profilePicture); // Send file as 'file'
  //     }

  //     const response = await axios.post(
  //       "http://localhost:5100/api/v1/admin/verify-otp",
  //       formDataToSend,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Login successful:", response.data);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //   }
  // };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5100/api/v1/admin/login", formData, {
        withCredentials: true,
      })
      .then((res1) => {
        console.log("res1 is : ", res1);
        alert("Login Succesfull !");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
  return (
    <div className="min-h-auto   bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              Admin Panel
            </div>
            <h2 className="text-2xl leading-tight font-bold text-gray-900 mb-5">
              Login in to your account
            </h2>
            <form
              className="space-y-4"
              // onSubmit={showOtpField ? handleVerifyOtp : handleGetOtp}
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
