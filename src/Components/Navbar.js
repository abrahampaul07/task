import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="/">Logo</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-300">SEARCH</a>
          <a href="/website" className="text-white hover:text-gray-300">WEBSITE</a>
          <a href="/linkedin" className="text-white hover:text-gray-300">LINKEDIN</a>
          <a href="/contact" className="text-white hover:text-gray-300">CONTACT</a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-blue-700 space-y-4 py-4`}>
        <a href="/" className="block text-white text-center hover:text-gray-300">SEARCH</a>
        <a href="/website" className="block text-white text-center hover:text-gray-300">WEBSITE</a>
        <a href="/linkedin" className="block text-white text-center hover:text-gray-300">LINKEDIN</a>
        <a href="/contact" className="block text-white text-center hover:text-gray-300">CONTACT</a>
      </div>
    </nav>
  );
};

export default Navbar;
