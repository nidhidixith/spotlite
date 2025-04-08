import React, { useState } from "react";
import { TimeAgo } from "../Others/TimeAgo";
import Image from "next/image";
import PostCarousel from "./PostCarousel";
import PostButtons from "./PostButtons";

const PostExcerpt = ({ post }) => {
  const uniqueKey = `post-${post?.id}`;
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div key={uniqueKey}>
      <div className="bg-white px-4 py-2">
        <div className="flex flex-row items-center">
          {post?.profile_pic && (
            <Image
              className="rounded-full mr-3"
              src={post?.profile_pic}
              resizemode="cover"
              width={50}
              height={50}
              alt="Profile picture"
            />
          )}

          <div className="flex-1">
            <div className="flex flex-row items-center">
              <p className="font-semibold text-base text-gray-800">
                {post?.display_name}
              </p>

              <p className="text-xs text-gray-500 italic ml-auto">
                <TimeAgo timestamp={post?.created_at} />
              </p>
            </div>
            <p className="text-xs text-gray-500">{post?.primary_interest}</p>
          </div>
        </div>

        {/* Post text */}
        {post?.text && (
          <div className="text-justify mt-2">
            {post?.text?.length > 250 ? (
              <p className="text-sm text-gray-800 text-justify">
                {showMore ? post.text : post.text.substring(0, 250)}

                <span
                  className="text-blue-600 text-sm italic cursor-pointer"
                  onClick={handleShowMoreLessButtonClick}
                >
                  {showMore ? " Show less" : " ...Show more"}
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-800 text-justify">{post?.text}</p>
            )}
          </div>
        )}
      </div>
      <PostCarousel mediaFiles={post?.media_files} />
      <PostButtons post={post} />
    </div>
  );
};

export default PostExcerpt;
