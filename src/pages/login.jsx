import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaApple, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth"; // Function to fetch user from localStorage

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = getUser(email);

    if (!user || user.password !== password) {
      setError("Invalid email or password");
      return;
    }

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 relative">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Log in to <span className="font-semibold text-indigo-500">Task Manager MVP</span>
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition"
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="h-px flex-1 bg-gray-600"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-4 justify-center mb-4">
          <button className="p-3 rounded-full bg-gray-700 border border-gray-600 hover:bg-gray-600 transition">
            <FaGoogle className="text-red-500" size={22} />
          </button>
          <button className="p-3 rounded-full bg-gray-700 border border-gray-600 hover:bg-gray-600 transition">
            <FaGithub className="text-white" size={22} />
          </button>
          <button className="p-3 rounded-full bg-gray-700 border border-gray-600 hover:bg-gray-600 transition">
            <FaLinkedin className="text-blue-600" size={22} />
          </button>
          <button className="p-3 rounded-full bg-gray-700 border border-gray-600 hover:bg-gray-600 transition">
            <FaApple className="text-white" size={22} />
          </button>
        </div>

        {/* Signup redirect */}
        <p className="text-gray-400 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
