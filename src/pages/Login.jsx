import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import hero3 from "../assets/hero/hero3.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      const { user, token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful ✅");

      window.dispatchEvent(new Event("cartUpdated"));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div
        className="bg-white shadow-xl rounded-xl overflow-hidden 
        w-full max-w-4xl h-[80vh] grid grid-cols-1 md:grid-cols-2 
        border border-[#f1e6d6]"
      >
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#5C4033] mb-1">
            ShopVerse
          </h1>

          <h2 className="text-gray-500 text-sm mb-6">
            Enter your email and password to login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-[#e8d8c3] rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B5E3C] text-white py-2.5 rounded-lg 
              font-semibold hover:bg-[#6f4e37] transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#8B5E3C] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="relative hidden md:block">
          <img
            src={hero3}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#C19A6B] opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;