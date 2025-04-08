import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

const NameProfilePic = ({
  obj,
  index,
  bottomSheetRef,
  removeUserFollower = null,
}) => {
  return (
    <View key={index} className="">
      <TouchableOpacity
        // onPress={() => {
        //   router.push({
        //     pathname: "(app)/display-profile/[userId]",
        //     params: {
        //       userId: obj?.user_id,
        //     },
        //   });
        //   bottomSheetRef?.current?.close();
        // }}
        onPress={() => {
          bottomSheetRef?.current?.dismiss(); // Dismiss bottom sheet first
          setTimeout(() => {
            router.push({
              pathname: "(app)/display-profile/[userId]",
              params: {
                userId: obj?.user_id,
              },
            });
          }, 300); // Add slight delay to ensure smooth transition
        }}
        className="flex flex-row justify-between items-center"
      >
        <View className="flex flex-row  items-center mr-2">
          <Image
            source={{ uri: obj?.profile_pic }}
            className="w-[40px] h-[40px] rounded-full mr-3"
            resizeMode="cover"
          />

          <Text className="text-base text-gray-800 font-medium">
            {obj?.display_name}
          </Text>
        </View>

        {removeUserFollower ? (
          <TouchableOpacity onPress={() => removeUserFollower(obj?.user_id)}>
            <Text className="text-sm text-sky-600">Remove</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-sm text-gray-500">{obj?.primary_interest}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NameProfilePic;
