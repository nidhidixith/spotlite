import { Stack } from "expo-router";

import React from "react";

const DisplayEventsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="display-user-events"
        options={{ headerTitle: "My Events" }}
      />
      <Stack.Screen
        name="display-other-user-events"
        options={{ headerTitle: "Events" }}
      />
      <Stack.Screen
        name="display-interested-events"
        options={{ headerTitle: "Interested Events" }}
      />
    </Stack>
  );
};

export default DisplayEventsLayout;
