import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ErrorComponent = ({ onRetry }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full px-4">
      <AiOutlineExclamationCircle className="text-red-500 mb-2" size={40} />
      <p className="text-base text-gray-700 text-center mb-4">
        Something went wrong, please try again later
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-sky-500 rounded-xl shadow-md hover:bg-sky-600 transition cursor-pointer"
        >
          <p className="text-white text-sm">Retry</p>
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
