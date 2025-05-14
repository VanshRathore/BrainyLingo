import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="p-6 flex justify-between items-center bg-transparent">
      <div className="text-3xl font-bold tracking-wider">BrainyLingo</div>
      <nav className="space-x-6 text-lg flex items-center">
        <Link
          to="/"
          className={`transition-colors ${isActive('/') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 no-underline`}
        >
          Home
        </Link>
        <a
          href="#"
          className={`transition-colors ${isActive('/leaderboard') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 no-underline`}
        >
          Leaderboard
        </a>
        <a
          href="#"
          className={`transition-colors ${isActive('/dailyquiz') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 no-underline`}
        >
          Daily Quiz
        </a>

        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className={`transition-colors flex items-center text-lg ${isDropdownOpen ? 'text-blue-400' : 'text-white'} hover:text-blue-400 no-underline`}
          >
            Genres
            <svg
              className={`ml-2 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-[#1a1a3b] rounded-xl shadow-lg w-48 z-10">
              <ul className="text-white">
                <li className="px-4 py-2 hover:bg-purple-700 hover:text-blue-400 cursor-pointer">Sci-Fi</li>
                <li className="px-4 py-2 hover:bg-purple-700 hover:text-blue-400 cursor-pointer">Fantasy</li>
                <li className="px-4 py-2 hover:bg-purple-700 hover:text-blue-400 cursor-pointer">Mystery</li>
                <li className="px-4 py-2 hover:bg-purple-700 hover:text-blue-400 cursor-pointer">Adventure</li>
                <li className="px-4 py-2 hover:bg-purple-700 hover:text-blue-400 cursor-pointer">Horror</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <button className="bg-gradient-to-r from-[#40e0d0] to-[#9370db] px-5 py-2 rounded-full text-white font-semibold">
        Sign Out
      </button>
    </header>
  );
};

export default Header;