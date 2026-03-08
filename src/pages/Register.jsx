import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hero3 from "../assets/hero/hero3.jpg";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        {
          name: firstName,
          email: email,
          password: password,
        }
      );

      // ✅ Check if created successfully
      if (response.status === 201) {
        setSuccessMessage("Registered Successfully 🎉");

        // Optional: store user/token if backend sends it
        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        }

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div
        className="bg-white shadow-xl rounded-xl overflow-hidden
                   w-full max-w-4xl h-[80vh]
                   grid grid-cols-1 md:grid-cols-2
                   border border-[#f1e6d6]"
      >
        
        {/* Left Side - Register Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">

          <h1 className="text-2xl font-bold text-[#5C4033] mb-1">
            ShopVerse
          </h1>

          <h2 className="text-gray-500 text-sm mb-6">
            Create your account to get started
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-[#6f4e37] mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-2.5 border border-[#e8d8c3] rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6f4e37] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border border-[#e8d8c3] rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6f4e37] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2.5 border border-[#e8d8c3] rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ✅ Success Message */}
            {successMessage && (
              <p className="text-green-600 text-sm font-medium">
                {successMessage}
              </p>
            )}

            {/* ❌ Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm font-medium">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#8B5E3C] text-white py-2.5 rounded-lg
                         font-semibold hover:bg-[#6f4e37]
                         transition duration-300 shadow-sm"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8B5E3C] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

        <div className="relative hidden md:block">
          <img
            src={hero3}
            alt="Register Visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#C19A6B] opacity-20"></div>
        </div>

      </div>
    </div>
  );
};

export default Register;