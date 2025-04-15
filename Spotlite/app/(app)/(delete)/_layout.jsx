import { Stack } from "expo-router";

import React from "react";

const DeleteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="delete-account"
        options={{ headerTitle: "Delete account" }}
      />
    </Stack>
  );
};

export default DeleteLayout;
