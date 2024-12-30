import { Stack } from "expo-router";

import React from "react";

const MenuLayout = () => {
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

export default MenuLayout;
