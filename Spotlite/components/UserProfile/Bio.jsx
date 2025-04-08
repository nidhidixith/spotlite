import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const Bio = ({ profile }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  return (
    <View className="bg-white px-4 py-3 mb-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">Bio</Text>
      {profile?.bio ? (
        profile?.bio?.length > 250 ? (
          <Text className="text-sm text-gray-800">
            {showMore ? profile.bio : profile.bio.substring(0, 250)}
            <Text
              className="text-blue-600  italic"
              onPress={handleShowMoreLessButtonClick}
            >
              {showMore ? " Show less" : " ...Show more"}
            </Text>
          </Text>
        ) : (
          <Text className="text-sm text-gray-800">{profile?.bio}</Text>
        )
      ) : (
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-bio")}
        >
          <Text className="text-base text-sky-600 self-center">
            Add your bio
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Bio;
