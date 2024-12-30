import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

const NameProfilePic = ({ obj, index, bottomSheetRef }) => {
  return (
    <View key={index}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "(app)/display-profile/[userId]",
            params: {
              userId: obj?.user_id,
            },
          });
          bottomSheetRef?.current?.close();
        }}
        className="flex flex-row justify-between items-center"
      >
        <View className="flex flex-row  items-center mr-2">
          <Image
            source={{ uri: obj?.profile_pic }}
            className="w-[40px] h-[40px] rounded-full mr-4"
            resizeMode="cover"
          />

          {/* <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "(app)/display-profile/[userId]",
                params: {
                  userId: obj?.user_id,
                },
              });
              bottomSheetRef?.current?.close();
            }}
          > */}
          <Text className="text-[16px]">{obj?.display_name}</Text>
          {/* </TouchableOpacity> */}
        </View>
        <Text className="text-[12px] italic text-gray-500">
          {obj?.primary_interest}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameProfilePic;
