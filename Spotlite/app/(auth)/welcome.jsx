import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Linking from "expo-linking";

const Welcome = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-row  justify-end p-1 my-1 px-4">
          <TouchableOpacity
            className="p-1 mr-2"
            onPress={() => {
              Linking.openURL("http://192.168.1.34:3000/about");
            }}
          >
            <Text className="text-sm text-sky-600">About us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-1"
            onPress={() => {
              Linking.openURL("http://192.168.1.34:3000/faqs");
            }}
          >
            <Text className="text-sm text-sky-600">FAQs</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/index-page-image.png")}
          style={{ height: screenHeight * 0.5, width: screenWidth }}
          resizeMode="cover"
        />

        <View className="px-6 py-2 flex-1">
          <View className="my-4">
            <Text className="font-bold text-3xl text-gray-800 text-center">
              Welcome to Spotlite!
            </Text>
            {/* <Text className="font-medium text-lg text-gray-700 text-center mt-1">
              A Platform for Creators Like You
            </Text> */}
            <Text className="text-base text-gray-500 text-center mt-2">
              Spotlite gives you the stage to showcase your creativity, share
              your journey, and grow your audience effortlessly.
            </Text>
          </View>

          <TouchableOpacity
            className="border border-sky-600 bg-sky-600 rounded-2xl p-2 my-4"
            onPress={() => router.replace("(auth)/login")}
          >
            <Text className=" text-lg text-white self-center font-medium">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border border-sky-600  rounded-2xl p-2"
            onPress={() => router.replace("(auth)/signup")}
          >
            <Text className=" text-lg text-sky-600 self-center font-medium">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* <View className="flex flex-row  justify-center p-1 px-2 mt-auto">
            <TouchableOpacity className="p-1 mr-2">
              <Text className="text-sm text-sky-600">About us</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-1">
              <Text className="text-sm text-sky-600">FAQs</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
