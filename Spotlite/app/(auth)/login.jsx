import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginError } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const newNotificationCount = useSelector(
    (state) => state.notification.newNotificationCount
  );

  const onSubmit = async (data) => {
    try {
      const userData = new FormData();
      userData.append("username", data.email);
      userData.append("password", data.password);

      const response = await dispatch(loginUser(userData)).unwrap();
      if (response) {
        Alert.alert("Login successful");
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
    <SafeAreaView className="flex-1 bg-white px-8 justify-center">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text className="font-rregular text-3xl font-bold mb-10 self-center">
          Login to your account
        </Text>

        <View className="mb-6">
          <Text className="font-rregular text-base font-bold mb-2">
            Email Address
          </Text>
          <View className="flex-row items-center rounded-sm bg-gray-100 px-4">
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
                  className="flex-1 px-1 py-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text className="font-rregular text-red-500 mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="font-rregular text-base font-bold mb-2">
            Password
          </Text>
          <View className="flex-row items-center rounded-sm bg-gray-100 px-4">
            <Entypo name="lock" size={20} color="black" marginRight={5} />
            <Controller
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 px-1 py-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your Password"
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>
          {errors.password && (
            <Text className="font-rregular text-red-500 mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>
        <Link
          className="font-rregular text-[16px] mb-12 self-center"
          href="/signup"
        >
          Don't have an account?{" "}
          <Text className="font-rregular text-sky-600 font-bold">Sign Up</Text>
        </Link>

        <TouchableOpacity
          className="bg-sky-600 border border-white py-2 rounded-full self-center w-full"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-rregular text-white text-xl font-bold self-center">
            Login
          </Text>
        </TouchableOpacity>
        {loginError && (
          <Text className="font-rregular text-red-500">
            {loginError.detail}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
