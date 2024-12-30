import { View, Text, ScrollView } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const SocialLinks = ({ profile }) => {
  // Check if any social links are present
  const hasSocialLinks = [
    profile?.instagram_link,
    profile?.facebook_link,
    profile?.youtube_link,
    profile?.tiktok_link,
    profile?.pinterest_link,
    profile?.twitter_link,
    profile?.threads_link,
    profile?.linkedin_link,
    profile?.additional_links &&
      profile.additional_links.length > 0 &&
      profile.additional_links[0] !== "",
  ].some(Boolean);

  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4">Social Links</Text>

      {hasSocialLinks ? (
        <>
          {profile?.instagram_link && (
            <View className="flex flex-row py-2 items-center">
              <AntDesign
                name="instagram"
                size={20}
                color="#E1306C"
                marginRight={8}
              />
              <Link
                href={profile?.instagram_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                Instagram
              </Link>
              <Text className="font-rregular font-bold text-[14px] ml-auto rounded-lg">
                20K Followers
              </Text>
            </View>
          )}
          {profile?.facebook_link && (
            <View className="flex flex-row py-2 items-center">
              <AntDesign
                name="facebook-square"
                size={20}
                color="#4267B2"
                marginRight={8}
              />
              <Link
                href={profile?.facebook_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                Facebook
              </Link>
              <Text className="font-rregular font-bold text-[14px] ml-auto rounded-lg">
                10K Followers
              </Text>
            </View>
          )}
          {profile?.youtube_link && (
            <View className="flex flex-row py-2 items-center">
              <AntDesign
                name="youtube"
                size={20}
                color="#FF0000"
                marginRight={8}
              />
              <Link
                href={profile?.youtube_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                YouTube
              </Link>
              <Text className="font-rregular font-bold text-[14px] ml-auto rounded-lg">
                100K Subscribers
              </Text>
            </View>
          )}
          {profile?.tiktok_link && (
            <View className="flex flex-row py-2 items-center">
              <FontAwesome6
                name="tiktok"
                size={16}
                color="#010101"
                marginRight={10}
              />
              <Link
                href={profile?.tiktok_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                TikTok
              </Link>
            </View>
          )}
          {profile?.pinterest_link && (
            <View className="flex flex-row py-2 items-center">
              <FontAwesome
                name="pinterest"
                size={18}
                color="#E60023"
                marginRight={9}
              />
              <Link
                href={profile?.pinterest_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                Pinterest
              </Link>
            </View>
          )}
          {profile?.twitter_link && (
            <View className="flex flex-row py-2 items-center">
              <FontAwesome
                name="twitter"
                size={18}
                color="#1DA1F2"
                marginRight={8}
              />
              <Link
                href={profile?.twitter_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                Twitter
              </Link>
            </View>
          )}
          {profile?.threads_link && (
            <View className="flex flex-row py-2 items-center">
              <FontAwesome6
                name="threads"
                size={18}
                color="#000000"
                marginRight={8}
              />
              <Link
                href={profile?.threads_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                Threads
              </Link>
            </View>
          )}
          {profile?.linkedin_link && (
            <View className="flex flex-row py-2 items-center">
              <AntDesign
                name="linkedin-square"
                size={18}
                color="#0077b5"
                marginRight={8}
              />
              <Link
                href={profile?.linkedin_link}
                className="font-rregular text-[16px] text-sky-600"
              >
                LinkedIn
              </Link>
            </View>
          )}
          {profile?.additional_links &&
            profile.additional_links.length > 0 &&
            profile.additional_links[0] !== "" && (
              <View>
                {Object.values(profile.additional_links)
                  .join(" ")
                  .split(",")
                  .map((link, index) => (
                    <View
                      key={index}
                      className="flex flex-row py-2 items-center"
                    >
                      <Entypo
                        name="link"
                        size={18}
                        color="black"
                        marginRight={8}
                      />
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-rregular text-[16px] text-sky-600"
                      >
                        Link
                      </Link>
                    </View>
                  ))}
              </View>
            )}
        </>
      ) : (
        <Text className="font-rregular text-[16px] text-gray-500">
          No links yet
        </Text>
      )}
    </View>
  );
};

export default SocialLinks;
