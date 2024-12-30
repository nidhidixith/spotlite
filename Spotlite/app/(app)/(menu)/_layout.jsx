import { Stack } from "expo-router";

import React from "react";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="menu" options={{ headerTitle: "Menu" }} />
      <Stack.Screen name="saved" options={{ headerTitle: "Saved" }} />
      <Stack.Screen
        name="settings"
        options={{ headerTitle: "Settings and Privacy" }}
      />
      <Stack.Screen name="about" options={{ headerTitle: "" }} />
      <Stack.Screen name="faqs" options={{ headerTitle: "" }} />
    </Stack>
  );
};

export default MenuLayout;
