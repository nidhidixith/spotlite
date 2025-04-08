import React from "react";
import { IoClose } from "react-icons/io5";

const GetAppModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent dark overlay
        // backdropFilter: "blur(2px)", // Optional: adds a blur effect
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Get the Spotlite App
          </h2>
          <p className="text-gray-600 text-center mb-4">
            To see more from the user, download the Spotlite app now!
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Play Store
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              App Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAppModal;
