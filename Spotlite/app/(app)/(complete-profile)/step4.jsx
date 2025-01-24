import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

const Step4 = ({ handlePrevStep, handleNextStep, handleSkip }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  const onSubmit = (data) => {
    console.log(data);
    handleNextStep(data);
  };

  // const onSkip = (data) => {
  //   console.log(data);
  //   handleSkip(data);
  // };

  return (
    <>
      <Text className="text-2xl font-semibold text-center mb-5">
        Connect your External Profiles
      </Text>

      {/* <TouchableOpacity onPress={handleSubmit(onSkip)}> */}
      <TouchableOpacity onPress={handleSkip}>
        <Text className="self-end text-end text-sky-600 text-[16px]">Skip</Text>
      </TouchableOpacity>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Instagram</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="instagram"
                size={18}
                color="#E4405F"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="instagramLink"
        />
        {errors.instagramLink && (
          <Text className="text-red-500 mb-2">
            {errors.instagramLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Facebook</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="facebook-square"
                size={18}
                color="#3b5998"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="facebookLink"
        />
        {errors.facebookLink && (
          <Text className="text-red-500 mb-2">
            {errors.facebookLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Youtube</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="youtube"
                size={20}
                color="#FF0000"
                marginRight={8}
              />

              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="youtubeLink"
        />
        {errors.youtubeLink && (
          <Text className="text-red-500 mb-2">
            {errors.youtubeLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Tiktok</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome6
                name="tiktok"
                size={16}
                color="#010101"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="tiktokLink"
        />
        {errors.tiktokLink && (
          <Text className="text-red-500 mb-2">{errors.tiktokLink.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Pinterest</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="pinterest"
                size={18}
                color="#E60023"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="pinterestLink"
        />
        {errors.pinterestLink && (
          <Text className="text-red-500 mb-2">
            {errors.pinterestLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Twitter</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="twitter"
                size={18}
                color="#1DA1F2"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="twitterLink"
        />
        {errors.twitterLink && (
          <Text className="text-red-500 mb-2">
            {errors.twitterLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Threads</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome6
                name="threads"
                size={18}
                color="#000000"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="threadsLink"
        />
        {errors.threadsLink && (
          <Text className="text-red-500 mb-2">
            {errors.threadsLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">LinkedIn</Text>
        </View>
        <Controller
          control={control}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="linkedin-square"
                size={18}
                color="#0077b5"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Add link"
              />
            </View>
          )}
          name="linkedInLink"
        />
        {errors.linkedInLink && (
          <Text className="text-red-500 mb-2">
            {errors.linkedInLink.message}
          </Text>
        )}
      </View>

      <View className="flex flex-row justify-between gap-x-4 mt-5">
        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handlePrevStep}
        >
          <Text className="text-white text-lg self-center">Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg self-center">Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Step4;
