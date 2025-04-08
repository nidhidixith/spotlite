"use client";

import React, { useState } from "react";
import Image from "next/image";
import GetAppModal from "../Others/GetAppModal";

const BasicDetails = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-white px-4 py-3 mb-4  rounded-lg  shadow-md w-full">
      {profile?.profile_pic && (
        <div className="flex justify-center items-center">
          <Image
            className="rounded-full cursor-pointer"
            src={profile?.profile_pic}
            width={120}
            height={120}
            alt="Picture of the author"
            resizemode="cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center items-center my-2 px-6">
        <p className="text-lg text-gray-800 font-semibold">
          {profile?.display_name}
        </p>

        <p className="text-gray-500 text-sm">{profile?.primary_interest}</p>
      </div>

      <div className="flex flex-row justify-between px-6 py-1 mb-4 border-t border-b border-gray-100">
        <button
          className="items-center gap-x-1 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className=" font-bold text-base text-gray-800">
            {profile?.follower_count}
          </p>
          <p className=" text-xs text-gray-500">Followers</p>
        </button>
        <button
          className="items-center gap-x-1 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className=" font-bold text-base text-gray-800">
            {profile?.following_count}
          </p>
          <p className=" text-xs text-gray-500">Following</p>
        </button>
        <button
          className="items-center gap-x-1 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className=" font-bold text-base text-gray-800">
            {profile?.no_of_posts}
          </p>
          <p className=" text-xs text-gray-500">Posts</p>
        </button>
      </div>

      <div className="flex flex-row items-center justify-between  gap-x-4">
        <button
          className="border border-sky-600 bg-sky-600 rounded-2xl p-1 flex-1 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className=" text-sm text-white self-center font-medium">Follow</p>
        </button>
        <button
          className="border border-sky-600 rounded-2xl p-1 flex-1 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className=" text-sm text-sky-600 self-center font-medium">
            Share Profile
          </p>
        </button>
      </div>
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BasicDetails;
