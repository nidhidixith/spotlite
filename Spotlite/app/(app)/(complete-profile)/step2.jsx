import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link, router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";

const Step2 = ({ handlePrevStep, handleNextStep }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Function to show date picker
  const showDatepickerHandler = () => {
    setShowDatePicker(true);
  };

  // Function to update the display name field based on first name and last name
  const updateDisplayName = () => {
    const displayName = `${firstName || ""} ${lastName || ""}`.trim();
    setValue("displayName", displayName);
  };

  useEffect(() => {
    updateDisplayName();
  }, [firstName, lastName]);

  const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(dateString)) {
      return "Invalid date format (DD-MM-YYYY)";
    }

    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return "Invalid date";
    }

    return true;
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  const onSubmit = (data) => {
    console.log(data);
    // router.push("/step3");
    handleNextStep(data);
  };

  return (
    <>
      <Text className="text-2xl font-semibold text-center mb-5">
        Basic Details
      </Text>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">First Name *</Text>
        <Controller
          control={control}
          rules={{
            required: "First name is required",
            maxLength: {
              value: 10,
              message: "Maximum 10 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="John"
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text className="text-red-500 mb-2">{errors.firstName.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">Last Name *</Text>
        <Controller
          control={control}
          rules={{
            required: "Last name is required",
            maxLength: {
              value: 10,
              message: "Maximum 10 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Doe"
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text className="text-red-500 mb-2">{errors.lastName.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">Display Name *</Text>
        <Controller
          control={control}
          rules={{
            required: "Display Name is required",
            maxLength: {
              value: 20,
              message: "Maximum 20 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="John Doe"
            />
          )}
          name="displayName"
        />
        {errors.displayName && (
          <Text className="text-red-500 mb-2">
            {errors.displayName.message}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">Date of birth *</Text>
        <Controller
          control={control}
          name="dob"
          rules={{
            required: "Date of birth is required",
            // validate: isValidDate,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                className="flex flex-row items-center border border-gray-200 rounded-xl px-2 py-3"
                onPress={showDatepickerHandler}
              >
                <Text className="flex-1">
                  {value ? new Date(value).toLocaleDateString() : "Select Date"}
                </Text>
                <AntDesign name="calendar" size={16} color="black" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="datePicker"
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  // onChange={(event, selectedDate) => {
                  //   const currentDate = selectedDate || value;
                  //   setShowDatePicker(false);
                  //   onChange(currentDate);
                  // }}
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || value;
                    setShowDatePicker(false);

                    // Format the date as YYYY-MM-DD before sending it to the backend
                    const formattedDate = currentDate
                      ? `${currentDate.getFullYear()}-${(
                          currentDate.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}-${currentDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}`
                      : "";

                    onChange(formattedDate); // Set the formatted date
                  }}
                />
              )}
            </>
          )}
        />
        {errors.dob && (
          <Text className="text-red-500 mb-2">{errors.dob.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">
          Location (Optional)
        </Text>
        <Controller
          control={control}
          rules={{
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Your location"
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text className="text-red-500 mb-2">{errors.location.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">
          Your Profession/Passion *
        </Text>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // autoComplete="name"
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Singer, Dancer, Chef, Painter, Photographer..."
            />
          )}
          name="primary_interest"
        />
        {errors.primary_interest && (
          <Text className="text-red-500 mb-2">
            {errors.primary_interest.message}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-[16px]">
          Bio/Description *
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Bio/Description is required",
            maxLength: {
              value: 500,
              message: "Maximum 500 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              numberOfLines={8}
              className="rounded-xl border border-gray-200 px-2 py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="bio"
        />
        {errors.bio && (
          <Text className="text-red-500 mb-2">{errors.bio.message}</Text>
        )}
      </View>

      <Text className="font-semibold">* Mandatory fields</Text>

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

export default Step2;
