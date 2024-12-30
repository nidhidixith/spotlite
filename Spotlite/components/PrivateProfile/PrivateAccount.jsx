import { View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";

const PrivateAccount = () => {
  return (
    <View className="px-4 py-3 bg-white">
      <View className="self-center mb-4">
        {/* <FontAwesome5 name="lock" size={44} color="black" /> */}
        <Feather name="lock" size={40} color="black" />
      </View>
      <Text className="text-center font-bold text-lg mb-2">
        This Account is Private
      </Text>
      <Text className="text-center text-base">
        You can't see the posts and activities until this user accepts your
        follow request.
      </Text>
    </View>
  );
};

export default PrivateAccount;
