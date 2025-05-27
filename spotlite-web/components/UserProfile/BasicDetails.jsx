"use client";

import React, { useState } from "react";
import Image from "next/image";
import GetAppModal from "../Others/GetAppModal";

const BasicDetails = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    // <div className="bg-white rounded-lg shadow-md w-full overflow-hidden mb-3">
    <div className="bg-white mb-4 shadow-md rounded-lg w-full">
      {/* Cover Photo */}

      <div className="relative w-full h-[120px] sm:h-[160px] md:h-[200px]">
        <Image
          src="/images/default-cover-image.png"
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>

      <div className="px-4 pb-3">
        <div className="-mt-20 sm:-mt-24 md:-mt-28 flex flex-col">
          <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] relative border-4 border-white rounded-full shadow-lg">
            <Image
              src={profile?.profile_pic}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xl text-gray-800 font-semibold">
            {profile?.display_name}
          </p>
          {/* <p className="text-gray-500 text-sm">{profile?.primary_interest}</p> */}
          <p className="text-gray-500 text-sm">
            Freelance Photographer & Editor | Vlogger | Health enthusiast
          </p>

          {/* Stats */}
          <div className="flex flex-row my-2">
            {[
              ["Followers", profile?.follower_count],
              ["Following", profile?.following_count],
              // ["Posts", profile?.no_of_posts],
            ].map(([label, count]) => (
              <button
                key={label}
                className="flex flex-row items-center gap-x-1 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <p className="font-semibold text-sm text-gray-700">{count}</p>
                <p className="text-sm text-gray-500">{label} &nbsp;</p>
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-x-2">
            <button
              className="border border-violet-500 bg-violet-500 rounded-2xl px-4"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-sm text-white font-medium">Follow</p>
            </button>
            <button
              className="border border-violet-500 rounded-2xl px-4 py-1"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-sm text-violet-500 font-medium">Share</p>
            </button>
          </div>
        </div>
      </div>

      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BasicDetails;
