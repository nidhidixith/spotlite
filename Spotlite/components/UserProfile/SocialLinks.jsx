import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { links } from "../../utilities/links";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const SocialLinks = ({ profile }) => {
  const hasSocialLinks = [
    (profile?.social_links &&
      profile.social_links.length > 0 &&
      profile.social_links[0] !== "") ||
      (profile?.additional_links &&
        profile.additional_links.length > 0 &&
        profile.additional_links[0] !== ""),
  ].some(Boolean);

  console.log("Social links of this user: ", profile?.social_links);
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4">
        Social Presence
      </Text>

      {hasSocialLinks ? (
        <>
          {profile?.social_links.map((link, index) => {
            const platformDetails = links[link.platform.toLowerCase()] || {};

            return (
              <View key={index} className="flex flex-row py-2 items-center">
                {platformDetails.icon || (
                  <AntDesign
                    name="questioncircle"
                    size={20}
                    color="#999"
                    marginRight={8}
                  />
                )}
                <Link
                  href={link.url}
                  className="font-rregular text-[16px] text-sky-600"
                >
                  {link.platform.charAt(0).toUpperCase() +
                    link.platform.slice(1)}
                </Link>
                {/* <Text className="font-rregular font-bold text-[14px] ml-auto rounded-lg">
              100K Subscribers
            </Text> */}
              </View>
            );
          })}

          {profile?.additional_links.map((link, index) => {
            return (
              <View key={index} className="flex flex-row py-2 items-center">
                <Entypo name="link" size={20} color="black" marginRight={8} />

                <Link
                  href={link.url}
                  className="font-rregular text-[16px] text-sky-600"
                >
                  {link.description.charAt(0).toUpperCase() +
                    link.description.slice(1)}
                </Link>
                {/* <Text className="font-rregular font-bold text-[14px] ml-auto rounded-lg">
              100K Subscribers
            </Text> */}
              </View>
            );
          })}
        </>
      ) : (
        <View className="flex flex-row justify-center">
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-links")}
          >
            <Text className="text-[16px] text-sky-600">
              Add your Social links/
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-websites")}
          >
            <Text className="text-[16px] text-sky-600">Add your Webistes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SocialLinks;
