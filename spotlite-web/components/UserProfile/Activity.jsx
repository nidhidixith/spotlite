import React, { useEffect, useState } from "react";

import PostExcerpt from "../Excerpts/PostExcerpt";
import EventExcerpt from "../Excerpts/EventExcerpt";
import { AiOutlineArrowRight } from "react-icons/ai";
import GetAppModal from "../Others/GetAppModal";

const Activity = ({ latestPost, latestEvent }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderComponent = () => {
    switch (activeTab) {
      case "Posts":
        return latestPost ? (
          <>
            <PostExcerpt post={latestPost} />

            <div
              className="flex justify-center items-center px-4 py-2 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="font-medium text-gray-600 text-sm text-center mr-2 ">
                View all posts
              </p>
              <AiOutlineArrowRight size={16} color="#4b5563" />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center px-4 py-2">
            <p className="text-sm text-gray-600  self-center font-medium ">
              No posts yet
            </p>
          </div>
        );

      case "Events":
        return latestEvent ? (
          <>
            <EventExcerpt event={latestEvent} />

            <div
              className="flex justify-center items-center px-4 py-2 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="font-medium text-gray-600 text-sm text-center mr-2 ">
                View all events
              </p>
              <AiOutlineArrowRight size={16} color="#4b5563" />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center px-4 py-2">
            <p className="text-sm text-gray-600  self-center font-medium">
              No events yet
            </p>
          </div>
        );

      default:
        return (
          <div className="flex justify-center items-center px-4 py-2">
            <p className="text-sm text-gray-600  self-center font-medium">
              No activity yet!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white mb-4 shadow-md rounded-lg w-full">
      <div className="px-4 py-3">
        <p className="text-gray-800 font-bold text-base mb-3">Activity</p>
        <div className="flex flex-row">
          <button
            className={`px-3 py-1 mr-4 rounded-2xl bg-gray-200 cursor-pointer ${
              activeTab === "Posts" && "bg-sky-600 border border-sky-600"
            }`}
            onClick={() => setActiveTab("Posts")}
          >
            <p
              className={`text-sm font-medium  ${
                activeTab === "Posts" && "text-white"
              }`}
            >
              Posts
            </p>
          </button>

          <button
            className={`px-3 py-1 mr-4 rounded-2xl bg-gray-200 cursor-pointer ${
              activeTab === "Events" && "bg-sky-600  border border-sky-600 "
            }`}
            onClick={() => setActiveTab("Events")}
          >
            <p
              className={`text-sm font-medium ${
                activeTab === "Events" && "text-white"
              }`}
            >
              Events
            </p>
          </button>
        </div>
      </div>

      <div className="border-t-2 border-gray-50">{renderComponent()}</div>
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Activity;
