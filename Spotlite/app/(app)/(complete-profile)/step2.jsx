import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
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
    handleNextStep(data);
  };

  return (
    <>
      <Text className="text-2xl text-gray-800 font-semibold text-center mb-5">
        Basic Details
      </Text>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          First Name *
        </Text>
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
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="John"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text className="text-red-500 mt-1">{errors.firstName.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          Last Name *
        </Text>
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
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Doe"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text className="text-red-500 mt-1">{errors.lastName.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          Display Name *
        </Text>
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
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="John Doe"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="displayName"
        />
        {errors.displayName && (
          <Text className="text-red-500 mt-1">
            {errors.displayName.message}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          Date of birth *
        </Text>
        <Controller
          control={control}
          name="dob"
          rules={{
            required: "Date of birth is required",

            validate: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date();

              // Reset the time part of both dates to compare only the date
              currentDate.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);

              if (selectedDate > currentDate) {
                return "Date of birth cannot be in the future";
              }
              return true; // Validation passed
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                className="flex flex-row items-center border border-gray-200 rounded-lg px-3 py-3 focus:border-sky-500"
                // className="rounded-lg border border-gray-200 px-2 py-2 text-gray-900 text-[16px] focus:border-sky-500"
                onPress={showDatepickerHandler}
              >
                {/* <Text className="text-[16px] text-gray-900 flex-1">
                  {value ? new Date(value).toLocaleDateString() : "Select Date"}
                </Text> */}

                <Text
                  className={`text-sm flex-1 ${
                    value ? "text-gray-900" : "text-gray-400"
                  }`}
                >
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
          <Text className="text-red-500 mt-1">{errors.dob.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
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
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Your location"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text className="text-red-500 mt-1">{errors.location.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          Your Profession/Passion *
        </Text>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Singer, Dancer, Chef, Vlogger..."
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="primary_interest"
        />
        {errors.primary_interest && (
          <Text className="text-red-500 mt-1">
            {errors.primary_interest.message}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-2 font-semibold text-sm text-gray-600">
          Bio/Description{" "}
          <Text className="italic text-gray-500">(Max 500 characters)</Text> *
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
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Your bio"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="bio"
        />
        {errors.bio && (
          <Text className="text-red-500 mt-1">{errors.bio.message}</Text>
        )}
      </View>

      <Text className="text-sm italic text-sky-600">* Mandatory fields</Text>

      <View className="flex flex-row justify-between gap-x-4 mt-5">
        <TouchableOpacity
          className="border border-sky-600 rounded-lg p-2 flex-1"
          onPress={handlePrevStep}
        >
          <Text className="text-sky-600 text-lg font-medium self-center">
            Prev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg font-medium self-center">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Step2;
