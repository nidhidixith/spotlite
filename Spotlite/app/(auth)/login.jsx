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
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../slices/authSlice";
import { resetUserProfile } from "../../slices/userProfileSlice";
import { resetPosts } from "../../slices/postsSlice";
import { resetEvents } from "../../slices/eventsSlice";
import {
  resetNewNotificationCount,
  resetNotifications,
} from "../../slices/notificationsSlice";
import { resetUserConnections } from "../../slices/userConnectionsSlice";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useToast } from "../../contexts/ToastContext";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { loginError } = useSelector((state) => state.users);

  const { showToast } = useToast();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const userData = new FormData();
      userData.append("username", data.email);
      userData.append("password", data.password);

      const response = await dispatch(loginUser(userData)).unwrap();
      if (response) {
        // Alert.alert("Login successful");
        showToast("Login successful", "success");
        await Promise.all([
          dispatch(resetUserProfile()),
          dispatch(resetUserConnections()),
          dispatch(resetPosts()),
          dispatch(resetEvents()),
          dispatch(resetNotifications()),
          // dispatch(resetNewNotificationCount()),
        ]);
        router.replace("/(app)/(tabs)/home");
      }
    } catch (error) {
      // console.error("Login error:", error);
      Alert.alert(
        "Login failed",
        "There was an error logging in. Please try again."
      );
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-8">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="mb-4">
          <Text className="text-3xl text-gray-900 font-bold mb-4">Log In</Text>
          <Text className=" text-sm text-gray-500">
            Please enter your email address and password to access your account
          </Text>
        </View>

        <View className="mb-4">
          <Text
            // style={{ fontFamily: "Roboto-Italic" }}
            className=" text-base text-gray-800 font-semibold mb-2"
          >
            Email Address
          </Text>
          <View className="flex-row items-center rounded-lg border border-gray-200 px-4 focus:border-sky-500">
            <FontAwesome
              name="envelope"
              size={16}
              color="black"
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

        <View className="mb-8">
          <Text className=" text-base text-gray-800 font-semibold mb-2">
            Password
          </Text>
          <View className="flex-row items-center rounded-lg border border-gray-200 px-4 focus:border-sky-500">
            {/* <Entypo name="lock" size={20} color="black" marginRight={5} /> */}
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
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 px-1 py-2 text-gray-900 text-sm"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your Password"
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

        <TouchableOpacity
          className="bg-sky-600 py-2 rounded-lg w-full max-w-md mx-auto"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className=" text-white text-lg font-medium self-center">
            Login
          </Text>
        </TouchableOpacity>
        {loginError && (
          <Text className=" text-red-500 mt-2 self-center">
            {loginError || loginError.detail}
          </Text>
        )}

        <Link
          className=" text-sm text-gray-500 self-center mt-4"
          href="/signup"
        >
          Don't have an account?{" "}
          <Text className=" text-sky-600 font-semibold underline">
            Create one
          </Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
