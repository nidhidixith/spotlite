import { Stack } from "expo-router";

import React from "react";

const MyConnectionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="my-followers"
        options={{ headerTitle: "My followers" }}
      />
      <Stack.Screen
        name="my-following"
        options={{ headerTitle: "My following" }}
      />
    </Stack>
  );
};

export default MyConnectionsLayout;
