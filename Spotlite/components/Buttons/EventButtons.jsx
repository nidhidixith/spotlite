import { View, Text } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const EventButtons = () => {
  return (
    <View className="bg-white px-4 py-2">
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center mr-4">
          <AntDesign name="like2" size={22} color="black" marginRight={5} />
          <Text>10</Text>
        </View>

        <View className="flex flex-row items-center mr-4">
          <FontAwesome
            name="comment-o"
            size={22}
            color="black"
            marginRight={5}
          />
          <Text>4</Text>
        </View>
        <View className="flex flex-row items-center ml-auto bg-fuchsia-100 px-3 py-2 rounded-2xl">
          <FontAwesome name="heart-o" size={16} color="black" marginRight={5} />
          <Text>Interested</Text>
        </View>
      </View>
    </View>
  );
};

export default EventButtons;
