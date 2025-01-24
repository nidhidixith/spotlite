import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1 w-full h-full"
        source={require("../../assets/images/bg-image.jpg")}
        resizeMode="cover"
      >
        <Image
          className="w-[150px] h-[75px] m-1"
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />

        <View className="flex-1 justify-center px-5">
          <Text className="font-rregular text-white font-bold text-5xl mb-10">
            Welcome to Spotlite!
          </Text>
          <Text className="font-rregular text-white text-base text-justify mb-16  ">
            Spotlite gives you the stage to showcase your creativity, share your
            journey, and grow your audience effortlessly.
          </Text>

          <TouchableOpacity
            className="border border-white py-2 rounded-xl self-center w-full"
            onPress={() => router.replace("(auth)/login")}
          >
            <Text className="font-rregular text-white text-xl font-bold self-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Welcome;
