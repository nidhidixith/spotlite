import { Stack } from "expo-router";

import React from "react";

const MenuLayout = () => {
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
    </Stack>
  );
};

export default MenuLayout;
