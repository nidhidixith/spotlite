import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { resetUserProfile } from "../../slices/userProfileSlice";
// import { resetUserConnections } from "../../slices/userConnectionsSlice";
import { resetPosts } from "../../slices/postsSlice";
import { resetEvents } from "../../slices/eventsSlice";
import { registerUser } from "../../slices/authSlice";
import { resetNotifications } from "../../slices/notificationsSlice";
import { resetUserConnections } from "../../slices/userConnectionsSlice";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerError } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const userData = new FormData();
      userData.append("username", data.email);
      userData.append("password", data.password);

      console.log(userData);
      const response = await dispatch(registerUser(userData)).unwrap();
      if (response) {
        Alert.alert("Registration successful");
        await Promise.all([
          dispatch(resetUserProfile()),
          dispatch(resetUserConnections()),
          dispatch(resetPosts()),
          dispatch(resetEvents()),
          dispatch(resetNotifications()),
        ]);
        // router.replace("/(app)/(tabs)/home");

        router.push("/(app)/(complete-profile)/complete-profile");
      }
    } catch (error) {
      // console.error("Login error:", error);
      Alert.alert("Registration failed", "Please try again.");
    }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   router.push("/UserProfileCompletion");

  //   // router.replace("/UserProfileCompletion");
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-center">
        <Text className="font-rregular text-3xl font-bold mb-10 self-center">
          Create your account
        </Text>
        {/* <Text className="font-rregular text-[14px] text-gray-500 mb-8">
          Join now, get discovered and enjoy your spotlight!
        </Text> */}

        <Text className="font-rregular text-base font-bold mb-2">
          Email Address
        </Text>
        <View className="flex-row items-center rounded-sm bg-gray-100 px-4 mb-6">
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
          <Text className="font-rregular text-red-500 mt-2">
            {errors.email.message}
          </Text>
        )}

        <Text className="font-rregular text-base font-bold mb-2">Password</Text>
        <View className="flex-row items-center rounded-sm bg-gray-100 px-4 mb-4">
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
                placeholder="Create your Password"
                secureTextEntry
              />
            )}
            name="password"
          />
        </View>
        {errors.password && (
          <Text className="font-rregular text-red-500 mt-2">
            {errors.password.message}
          </Text>
        )}
        <Link
          className="font-rregular text-[16px] mb-12 self-center"
          href="/login"
        >
          <Text className="font-rregular text-[16px] mb-12 self-center">
            Already have an account?{" "}
            <Text className="text-sky-600 font-bold">Login</Text>
          </Text>
        </Link>

        <TouchableOpacity
          className="bg-sky-600 border border-white py-2 rounded-full self-center w-full"
          onPress={handleSubmit(onSubmit)}
          // onPress={() =>
          //   router.push("(app)/(complete-profile)/complete-profile")
          // }
        >
          <Text className="font-rregular text-white text-xl font-bold self-center">
            Sign Up
          </Text>
        </TouchableOpacity>
        {registerError && (
          <Text className="font-rregular text-red-500">
            {registerError.detail}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
