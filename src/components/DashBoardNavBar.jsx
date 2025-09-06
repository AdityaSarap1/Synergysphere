import React from "react";
import { FaTasks, FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function DashboardNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="relative w-full bg-gray-900/90 backdrop-blur-md shadow-lg px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300 overflow-hidden">
      {/* Glowing dots background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.05),_transparent_25%),radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.05),_transparent_25%)] animate-pulse"></div>
      </div>

      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-2xl font-bold text-indigo-400 tracking-wide drop-shadow-lg">
          TaskMVP
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8 relative z-10">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 font-semibold text-lg transition-all duration-300 ${
            currentPath === "/dashboard"
              ? "text-indigo-400 underline underline-offset-4"
              : "text-gray-300 hover:text-indigo-300"
          }`}
        >
          <FaClipboardList /> Dashboard
        </Link>

        <Link
          to="/mytasks"
          className={`flex items-center gap-2 font-semibold text-lg transition-all duration-300 ${
            currentPath === "/mytasks"
              ? "text-indigo-400 underline underline-offset-4"
              : "text-gray-300 hover:text-indigo-300"
          }`}
        >
          <FaTasks /> My Tasks
        </Link>
      </div>

      {/* Right: Search + Auth Links */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search projects/tasks..."
          className="hidden sm:block px-4 py-2 rounded-2xl border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition-all duration-300 w-64"
        />

        {/* Login & Signup */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full font-semibold text-gray-300 hover:text-indigo-400 hover:bg-gray-800 transition-all duration-300 shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

