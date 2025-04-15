import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as Linking from "expo-linking";

import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { resetUserProfile } from "../../slices/userProfileSlice";
import { resetPosts } from "../../slices/postsSlice";
import { resetEvents } from "../../slices/eventsSlice";
import { registerUser } from "../../slices/authSlice";
import {
  resetNewNotificationCount,
  resetNotifications,
} from "../../slices/notificationsSlice";
import { resetUserConnections } from "../../slices/userConnectionsSlice";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useToast } from "../../contexts/ToastContext";
import { clearSearches } from "../../slices/searchSlice";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { registerError } = useSelector((state) => state.users);

  const { showToast } = useToast();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const userData = new FormData();
      userData.append("username", data.email);
      userData.append("password", data.password);

      const response = await dispatch(registerUser(userData)).unwrap();
      if (response) {
        // Alert.alert("Registration successful");
        showToast(
          "Registration successful, Please complete your profile",
          "success"
        );
        await Promise.all([
          dispatch(resetUserProfile()),
          dispatch(resetUserConnections()),
          dispatch(resetPosts()),
          dispatch(resetEvents()),
          dispatch(resetNotifications()),
          dispatch(clearSearches()),
          // dispatch(resetNewNotificationCount()),
        ]);

        router.push("/(app)/(complete-profile)/complete-profile");
      }
    } catch (error) {
      // console.error("Login error:", error);
      // Alert.alert("Registration failed", "Please try again.");
      Alert.alert("Registration failed", "Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-8 py-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="mb-4">
          <Text className=" text-3xl text-gray-900 font-bold mb-4">
            Create your account
          </Text>
          <Text className=" text-sm text-gray-500">
            Enter your details below to create a new account and get started.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-base text-gray-800 font-semibold mb-2">
            Email Address
          </Text>

          <View className="flex-row items-center rounded-lg border border-gray-200 px-4 focus:border-sky-500">
            <FontAwesome
              name="envelope"
              size={16}
              color="#333333"
              marginRight={5}
            />
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 px-1 py-2 text-gray-900 text-sm"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="name@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text className=" text-red-500 mt-1">{errors.email.message}</Text>
          )}
        </View>

        <View className="">
          <Text className="text-base text-gray-800 font-semibold mb-2">
            Password
          </Text>

          <View className="flex-row items-center rounded-lg border border-gray-200 px-4 focus:border-sky-500">
            <FontAwesome
              name="lock"
              size={22}
              color="#333333"
              marginRight={6}
            />
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
                maxLength: {
                  value: 8,
                  message: "Password must not exceed 8 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 px-1 py-2 text-gray-900 text-sm"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Create your Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                />
              )}
              name="password"
            />
            {/* Eye Icon for Toggle */}
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="p-1"
            >
              <FontAwesome
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={18}
                color="#333333"
                // marginLeft={8}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className=" text-red-500 mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        <View className="mt-4 mb-4">
          <Text className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <Text
              className="underline text-sky-600"
              onPress={() => Linking.openURL("http://192.168.1.33:3000/terms")}
            >
              Terms
            </Text>{" "}
            and{" "}
            <Text
              className="underline text-sky-600"
              onPress={() =>
                Linking.openURL("http://192.168.1.33:3000/privacy")
              }
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        <TouchableOpacity
          className="bg-sky-600 py-2 rounded-lg w-full max-w-md mx-auto"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className=" text-white text-lg font-medium self-center">
            Sign Up
          </Text>
        </TouchableOpacity>
        {registerError && (
          <Text className=" text-red-500 mt-2 self-center">
            {registerError || registerError.detail}
          </Text>
        )}

        <Link className=" text-sm text-gray-500 self-center mt-4" href="/login">
          Already have an account?{" "}
          <Text className=" text-sky-600 font-semibold underline">Login</Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
