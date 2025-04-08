import React, { useState } from "react";

import { BiLike } from "react-icons/bi";

import { FaRegComment } from "react-icons/fa";
import GetAppModal from "../Others/GetAppModal";

const PostButtons = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white px-4 py-3">
      <div className="flex flex-row items-center">
        <div
          className="flex flex-row items-center mr-4 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <BiLike size={20} color="#1f2937" style={{ marginRight: 5 }} />

          <p className="text-gray-800 text-sm">
            {post?.like_count > 0 && `${post?.like_count} likes`}
          </p>
        </div>

        <div
          className="flex flex-row items-center mr-4 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <FaRegComment size={18} color="#1f2937" style={{ marginRight: 5 }} />

          <p className="text-gray-800 text-sm">
            {post?.comment_count > 0 && `${post?.comment_count} comments`}
          </p>
        </div>
      </div>
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PostButtons;
