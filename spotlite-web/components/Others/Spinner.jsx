import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full text-sky-600">
      <AiOutlineLoading className="animate-spin" size={32} />
    </div>
  );
};

export default Spinner;
