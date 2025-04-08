import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import {
  selectUserProfile,
  fetchQuestions,
  selectAllQuestions,
  createOrUpdateAnswers,
} from "../../../slices/userProfileSlice";

import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";

const EditQuestionsAndAnswers = () => {
  const profile = useSelector(selectUserProfile);
  const [answers, setAnswers] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchQuestions()).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch questions:", error); // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const questions = useSelector(selectAllQuestions);

  const fetchQuestionsStatus = useSelector(
    (state) => state.profile.questions.fetchQuestionsStatus
  );

  const fetchQuestionsError = useSelector(
    (state) => state.profile.questions.fetchQuestionsError
  );

  const createAnswerStatus = useSelector(
    (state) => state.profile.answers.createAnswerStatus
  );

  const createAnswerError = useSelector(
    (state) => state.profile.answers.createAnswerError
  );

  if (fetchQuestionsStatus === "loading" || createAnswerStatus === "loading") {
    return <LoadingIndicator />;
  }

  if (fetchQuestionsError) {
    return <ErrorDisplayComponent />;
  }

  const handleAnswerChange = (questionId, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text.trim() }));
  };

  const onSubmit = async () => {
    const formData = new FormData();

    Object.entries(answers).forEach(([questionId, answer]) => {
      formData.append("answers", JSON.stringify({ questionId, answer }));
    });

    try {
      const response = await dispatch(createOrUpdateAnswers(formData)).unwrap();
      setAnswers({});
      Alert.alert("Edit Successful");
      router.replace("(app)/(edit-profile)/edit-profile");
    } catch (err) {
      console.error("Request failed", err);
      console.log(err);

      const errorMessage =
        (typeof err === "string" && err) || // If `err` is a string, use it
        err?.message || // If `err` has a `message` property
        JSON.stringify(err) || // Convert `err` to string if it's an object
        "An unknown error occurred. Try again later"; // Fallback message

      Alert.alert("Edit Failed", errorMessage); // Pass string to Alert.alert
      router.replace("(app)/(edit-profile)/edit-profile");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,

        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <Text className="text-2xl text-sky-600 font-semibold text-center mb-4">
        Q&A Form
      </Text>

      {questions.map((item) => {
        const existingAnswer = profile[0]?.questions_and_answers?.find(
          (answer) => answer.question_id === item.id
        );

        return (
          <View key={item.id} className="mb-4">
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              {item.text}
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  multiline={true}
                  defaultValue={
                    existingAnswer ? existingAnswer.answer_text : ""
                  }
                  onChangeText={(text) => handleAnswerChange(item.id, text)}
                  returnKeyType="default"
                  blurOnSubmit={false}
                />
              )}
              name="answerInput"
            />
            {errors.answerInput && (
              <Text className="text-red-500 mt-1">
                {errors.answerInput.message}
              </Text>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        className="border border-sky-600 bg-sky-600 rounded-lg p-1 mt-2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-base text-white self-center font-medium">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditQuestionsAndAnswers;
