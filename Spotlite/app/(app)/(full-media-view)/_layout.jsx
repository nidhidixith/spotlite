import { Stack } from "expo-router";

import React from "react";

const FullMediaViewLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="event-full-view" options={{ title: "Event" }} />
      <Stack.Screen name="post-full-view" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FullMediaViewLayout;
