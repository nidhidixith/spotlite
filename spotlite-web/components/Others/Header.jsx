"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import GetAppModal from "./GetAppModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <nav className="bg-white flex items-center justify-around px-6 py-4 border-b-2 border-gray-200">
      <h1 className="text-2xl font-bold text-sky-600">Spotlite</h1>
      <div className="flex items-center gap-6">
        <button
          className="text-base font-medium text-sky-600 cursor-pointer hover:underline"
          onClick={toggleModal}
          aria-label="Get the Spotlite App"
        >
          Get App
        </button>
        <Link
          href="/about"
          className={
            "text-base font-medium text-sky-600 transition-all duration-200"
          }
        >
          About Us
        </Link>
        <Link
          href="/faqs"
          className="text-base font-medium text-sky-600 hover:underline"
        >
          FAQs
        </Link>
      </div>
      <GetAppModal isOpen={isModalOpen} onClose={toggleModal} />
    </nav>
  );
};

export default Header;
