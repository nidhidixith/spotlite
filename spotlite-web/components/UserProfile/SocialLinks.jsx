import React from "react";
import { IoHelpCircle, IoLink, IoChevronForward } from "react-icons/io5";

import { links } from "../utils/links";
import Link from "next/link";

const SocialLinks = ({ profile }) => {
  const hasSocialLinks = [
    (profile?.social_links &&
      profile.social_links.length > 0 &&
      profile.social_links[0] !== "") ||
      (profile?.additional_links &&
        profile.additional_links.length > 0 &&
        profile.additional_links[0] !== ""),
  ].some(Boolean);

  return (
    <div className="bg-white px-4 py-3 mb-4 shadow-md rounded-lg w-full">
      <p className="text-gray-800 font-bold text-base mb-3">Social Presence</p>

      {hasSocialLinks ? (
        <>
          {profile?.social_links.map((link, index) => {
            const platformDetails = links[link.platform.toLowerCase()] || {};

            return (
              <div key={index} className="flex flex-row py-2 items-center">
                {platformDetails.icon || (
                  <IoHelpCircle
                    size={18}
                    color="#4b5563"
                    style={{ marginRight: 8 }}
                  />
                )}

                <Link href={link.url} className=" text-sm text-sky-600 ml-1">
                  {link.platform.charAt(0).toUpperCase() +
                    link.platform.slice(1)}
                </Link>

                <div className="ml-auto">
                  <IoChevronForward
                    size={14}
                    color="#9ca3af"
                    style={{ marginRight: 8 }}
                  />
                </div>
              </div>
            );
          })}

          {profile?.additional_links.map((link, index) => {
            return (
              <div key={index} className="flex flex-row py-2 items-center">
                <IoLink size={16} color="#4b5563" style={{ marginRight: 8 }} />
                <Link href={link.url} className=" text-sm text-sky-600 ml-1">
                  {link.description.charAt(0).toUpperCase() +
                    link.description.slice(1)}
                </Link>
                <div className="ml-auto">
                  <IoChevronForward
                    size={14}
                    color="#9ca3af"
                    style={{ marginRight: 8 }}
                  />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-row justify-center">
          <p className="text-sm text-gray-600">No links added yet!</p>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
