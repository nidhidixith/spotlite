import { Stack } from "expo-router";

import React from "react";

const DisplayPostsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="display-user-posts"
        options={{ headerTitle: "My Posts" }}
      />
      <Stack.Screen
        name="display-other-user-posts"
        options={{ headerTitle: "Posts" }}
      />
    </Stack>
  );
};

export default DisplayPostsLayout;
