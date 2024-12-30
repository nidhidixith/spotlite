import { Stack } from "expo-router";

import React from "react";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create-post"
        options={{ headerTitle: "Create Post" }}
      />
      <Stack.Screen
        name="create-event"
        options={{
          headerTitle: "Create Event",
        }}
      />
    </Stack>
  );
};

export default MenuLayout;
