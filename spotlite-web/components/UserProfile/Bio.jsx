import React, { useState } from "react";

const Bio = ({ profile }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-white px-4 py-3 mb-4   shadow-md rounded-lg w-full">
      <p className="text-gray-800 font-bold text-base mb-3">Bio</p>
      {profile?.bio ? (
        profile?.bio?.length > 250 ? (
          <p className="text-sm text-gray-800 text-justify">
            {showMore ? profile.bio : profile.bio.substring(0, 250)}
            <span
              className="text-blue-600  italic cursor-pointer"
              onClick={handleShowMoreLessButtonClick}
            >
              {showMore ? " Show less" : " ...Show more"}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-800 text-justify">{profile?.bio}</p>
        )
      ) : (
        <p className="text-sm text-gray-600 self-center text-justify">
          No bio yet
        </p>
      )}
    </div>
  );
};

export default Bio;
