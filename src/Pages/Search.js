import React, { useState } from 'react';
import bg from "../Assets/bg.jpg"; // Import the background image
import logoImage from "../Assets/logoImage.jpg";
import data from "../data/data.json"; // Import the JSON data
import { FaPhoneAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'; // Import icons for phone, location, and search

const Search = () => {
  const [query, setQuery] = useState(''); // State to hold the search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item for the modal

  // Trim the query and filter the data based on the search query
  const filteredData = data.filter(item => {
    // Trim and clean up the query to handle leading/trailing spaces
    const trimmedQuery = query.trim().toLowerCase();

    // If the query is empty, return all items
    if (!trimmedQuery) return true;

    // Split the query by spaces to allow searching both first and last name independently
    const queryParts = trimmedQuery.split(' ');

    // Check if any part of the query matches the first name or last name (case-insensitive)
    return queryParts.every(part => 
      item.first_name?.toLowerCase().includes(part) ||
      item.last_name?.toLowerCase().includes(part) ||
      item.city?.toLowerCase().includes(part)
    );
  });

  // Handle opening the modal and setting the selected item
  const handleFetchDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col justify-center items-center h-full py-20">
        {/* Logo Image */}
        <img
          src={logoImage}
          alt="Logo"
          className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 object-contain"
        />
        
        {/* Search Bar with Search Icon */}
        <div className="relative w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-6">
          <input
            type="text"
            placeholder="Search by name or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 text-lg rounded-full pl-10"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>

        {/* Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4 w-full">
          {filteredData.length === 0 ? (
            <p className="text-white">No results found</p>
          ) : (
            filteredData.map(item => (
              <div key={item.contact_number} className="bg-white p-4 rounded-lg shadow-md">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${item.contact_number.slice(-1)}`} // Placeholder profile image based on contact number
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                
                {/* Name */}
                <h3 className="font-bold text-xl text-center">{item.first_name} {item.last_name}</h3>
                
                {/* Location with Icon */}
                <div className="flex justify-center items-center mt-2">
                  <FaMapMarkerAlt className="mr-2 text-gray-600" />
                  <p className="text-gray-600">{item.city}</p>
                </div>
                
                {/* Horizontal Line */}
                <hr className="my-4 border-gray-300" />

                {/* Phone Number and Available Text */}
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <FaPhoneAlt className="mr-2 text-gray-600" />
                    <p className="text-gray-600">{item.contact_number}</p>
                  </div>
                  {/* "Available on phone" below the phone number */}
                  <p className="text-sm text-gray-600 mt-2">Available on phone</p>
                </div>

                {/* Button for Fetching Details */}
                <div className="mt-4">
                  <button
                    onClick={() => handleFetchDetails(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full"
                  >
                    Fetch Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Fetch Details</h2>
            <p className="mb-4">Here are the details of the following employee:</p>

            {/* Modal Content */}
            <div className="flex flex-col items-center mb-4">
              {/* Profile Image */}
              <img
                src={`https://i.pravatar.cc/150?img=${selectedItem.contact_number.slice(-1)}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="font-bold text-lg">{selectedItem.first_name} {selectedItem.last_name}</p>
              <p className="text-gray-600">{selectedItem.city}</p>
              <p className="text-gray-600">{selectedItem.contact_number}</p>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
