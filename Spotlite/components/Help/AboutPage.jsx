import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

const AboutPage = () => {
  return (
    <ScrollView className="bg-gray-50 flex-1">
      {/* Header Section */}
      {/* <View className="bg-indigo-600 py-4 px-3"> */}
      <View className="bg-sky-600 py-3 px-3">
        <Text className="text-white text-xl font-bold text-center">
          About Spotlite
        </Text>
      </View>

      {/* Content Section */}
      <View className="px-4 py-6">
        {/* Illustration */}

        {/* Main Text */}
        <Text className="text-gray-800 text-base leading-relaxed mb-4">
          Welcome to <Text className="font-bold">Spotlite</Text>, the ultimate
          platform for artists, content creators, and influencers to shine.
          Spotlite is designed to celebrate you—your art, your passion, and your
          journey—by showcasing what truly defines you. Here, you can craft a
          profile that highlights who you are, your interests, creative works,
          and links to your other social platforms.
        </Text>

        <Text className="text-gray-800 text-base leading-relaxed">
          Our platform encourages authentic and original content, shining a
          light on real creativity. Whether you’re an emerging artist, a
          seasoned content creator, or an inspiring influencer, Spotlite gives
          you the space to connect, share, and grow. Build your network, share
          your stories, create posts and events, and inspire others while being
          inspired yourself.
        </Text>

        {/* Highlighted Section */}
        <View className="bg-sky-100 p-4 mt-4 rounded-md">
          <Text className="text-sky-800 text-base leading-relaxed">
            At Spotlite, we believe in empowering creators to take center stage
            because{" "}
            <Text className="font-bold">your art deserves to be seen</Text>,
            your voice deserves to be heard, and your journey deserves to be
            celebrated.
          </Text>
        </View>
      </View>

      {/* Footer Section */}
      {/* <View className="px-4 py-6">
        <TouchableOpacity className="bg-indigo-600 rounded-full py-3">
          <Text className="text-center text-white font-bold">Get Started</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

export default AboutPage;
