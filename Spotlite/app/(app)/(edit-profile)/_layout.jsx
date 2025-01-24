import { Stack } from "expo-router";

import React from "react";

const EditProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="edit-profile" options={{ title: "Edit" }} />

      <Stack.Screen
        name="edit-profile-picture"
        options={{ title: "Edit Profile Picture" }}
      />
      <Stack.Screen name="edit-details" options={{ title: "Edit Details" }} />
      <Stack.Screen name="edit-bio" options={{ title: "Edit Bio" }} />
      <Stack.Screen name="edit-links" options={{ title: "Edit Links" }} />
      <Stack.Screen name="edit-websites" options={{ title: "Edit Websites" }} />
      <Stack.Screen
        name="edit-interests"
        options={{ title: "Edit Interests" }}
      />
      <Stack.Screen
        name="edit-questions-and-answers"
        options={{ title: "Edit Questions and Answers" }}
      />
    </Stack>
  );
};

export default EditProfileLayout;
