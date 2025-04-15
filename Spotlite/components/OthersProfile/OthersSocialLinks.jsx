import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { links } from "../../utilities/links";

const OthersSocialLinks = ({ profile }) => {
  const hasSocialLinks = [
    (profile?.social_links &&
      profile.social_links.length > 0 &&
      profile.social_links[0] !== "") ||
      (profile?.additional_links &&
        profile.additional_links.length > 0 &&
        profile.additional_links[0] !== ""),
  ].some(Boolean);

  return (
    <View className="bg-white px-4 py-3 mb-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        Social Presence
      </Text>

      {hasSocialLinks ? (
        <>
          {profile?.social_links.map((link, index) => {
            const platformDetails = links[link.platform.toLowerCase()] || {};

            return (
              <View key={index} className="flex flex-row py-2 items-center">
                {platformDetails.icon || (
                  <Ionicons
                    name="help-circle"
                    size={18}
                    color="#4b5563"
                    marginRight={8}
                  />
                )}
                <Link href={link.url} className=" text-base text-sky-600 ml-1">
                  {link.platform.charAt(0).toUpperCase() +
                    link.platform.slice(1)}
                </Link>
              </View>
            );
          })}

          {profile?.additional_links.map((link, index) => {
            return (
              <View key={index} className="flex flex-row py-2 items-center">
                <Ionicons
                  name="link"
                  size={18}
                  color="#4b5563"
                  marginRight={8}
                />

                <Link href={link.url} className=" text-base text-sky-600 ml-1">
                  {link.description.charAt(0).toUpperCase() +
                    link.description.slice(1)}
                </Link>
              </View>
            );
          })}
        </>
      ) : (
        <Text className="text-base text-gray-600 self-center">
          No social links yet
        </Text>
      )}
    </View>
  );
};

export default OthersSocialLinks;
