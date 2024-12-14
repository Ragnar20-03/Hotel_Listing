import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); // File size error
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (file.size > maxSize) {
        setFileError(
          `File size too large. Got ${file.size} bytes. Maximum is ${maxSize} bytes.`
        );
        return;
      }

      setFileError(null); // Clear any previous error
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5100/api/v1/admin/get-otp",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        setShowOtpField(true);
      }
    } catch (error) {
      console.error("Error getting OTP:", error);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (profilePicture) {
        formDataToSend.append("file", profilePicture); // Send file as 'file'
      }

      const response = await axios.post(
        "http://localhost:5100/api/v1/admin/verify-otp",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              Admin Panel
            </div>
            <h2 className="text-2xl leading-tight font-bold text-gray-900 mb-5">
              Sign in to your account
            </h2>
            <form
              className="space-y-4"
              onSubmit={showOtpField ? handleVerifyOtp : handleGetOtp}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.phone}
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
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture (optional)
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
                {fileError && (
                  <p className="text-red-500 text-sm mt-2">{fileError}</p>
                )}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="mt-2 rounded-full w-20 h-20 object-cover"
                  />
                )}
              </div>
              {showOtpField && (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showOtpField ? "Verify OTP" : "Get OTP"}
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
