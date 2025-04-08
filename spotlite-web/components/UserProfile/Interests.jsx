import React from "react";

const Interests = ({ profile }) => {
  return (
    <div className="bg-white px-4 py-3 mb-4 shadow-md rounded-lg w-full">
      <p className="text-gray-800 font-bold text-base mb-3">Interests</p>

      {profile?.areas_of_interest && profile?.areas_of_interest.length > 0 ? (
        <div className="flex flex-row gap-2 flex-wrap">
          {Object.values(profile.areas_of_interest)
            .join(" ")
            .split(",")
            .map((interest, index) => (
              <div
                key={index}
                className=" bg-gray-100 border border-gray-200 flex-wrap rounded-2xl py-1 px-2"
              >
                <p className="text-sm font-medium text-gray-800">
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 self-center">No interests added</p>
      )}
    </div>
  );
};

export default Interests;
