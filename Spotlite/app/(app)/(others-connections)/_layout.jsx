import { Stack } from "expo-router";

import React from "react";

const OthersConnectionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="others-followers"
        options={{ headerTitle: "Followers" }}
      />
      <Stack.Screen
        name="others-following"
        options={{ headerTitle: "Following" }}
      />
    </Stack>
  );
};

export default OthersConnectionsLayout;
