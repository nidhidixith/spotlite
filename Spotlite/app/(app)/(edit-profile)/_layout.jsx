import { Stack } from "expo-router";

import React from "react";

const EditProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="edit-profile" options={{ title: "Edit profile" }} />

      <Stack.Screen
        name="edit-profile-picture"
        options={{ title: "Edit profile picture" }}
      />
      <Stack.Screen name="edit-details" options={{ title: "Edit details" }} />
      <Stack.Screen name="edit-bio" options={{ title: "Edit bio" }} />
      <Stack.Screen name="edit-links" options={{ title: "Edit links" }} />
      <Stack.Screen name="edit-websites" options={{ title: "Edit websites" }} />
      <Stack.Screen
        name="edit-interests"
        options={{ title: "Edit interests" }}
      />
      <Stack.Screen
        name="edit-questions-and-answers"
        options={{ title: "Edit questions and answers" }}
      />
    </Stack>
  );
};

export default EditProfileLayout;
