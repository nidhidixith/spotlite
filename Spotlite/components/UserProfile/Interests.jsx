import { View, Text, ScrollView } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const profile = {
  areas_of_interest: ["Singing,Cooking,Vlogging,Cinematography"],
};

const Interests = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4 ">Interests</Text>

      {profile?.areas_of_interest && (
        <View className="flex flex-row gap-2 flex-wrap">
          {Object.values(profile.areas_of_interest)
            .join(" ")
            .split(",")
            .map((interest, index) => (
              <View
                key={index}
                className="bg-gray-50 border border-gray-300 flex-wrap rounded-xl py-1 px-2"
              >
                <Text className="text-[16px]  "> {interest}</Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default Interests;
