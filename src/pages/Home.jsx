import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">

      {/* Animated Dots Background */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:50px_50px] animate-moveDots pointer-events-none absolute inset-0"></div>
      </div>

      {/* Content Card */}
      <div className="bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl p-12 max-w-3xl w-full text-center backdrop-blur-md">

        {/* Logo / App Name */}
        <h1 className="text-5xl font-extrabold text-indigo-500 mb-4 animate-bounce">
          TaskMVP
        </h1>

        {/* Tagline */}
        <p className="text-gray-300 text-lg mb-8">
          Manage your tasks efficiently and stay organized.<br />
          Simple. Clean. Powerful.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-green-600 hover:to-teal-600 transition"
          >
            Create Account
          </button>
        </div>

        {/* Optional Footer */}
        <p className="text-gray-400 mt-6 text-sm">
          Already a user?{" "}
          <span
            className="font-semibold cursor-pointer text-indigo-400 hover:text-indigo-500"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>

      {/* Tailwind Keyframes */}
      <style>
        {`
          @keyframes moveDots {
            0% { background-position: 0 0; }
            100% { background-position: 1000px 1000px; }
          }
          .animate-moveDots {
            animation: moveDots 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
