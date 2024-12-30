import { Stack } from "expo-router";

import React from "react";

const CompleteProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="step1" options={{ headerShown: false }} />
      <Stack.Screen name="step2" options={{ headerShown: false }} />
      <Stack.Screen name="step3" options={{ headerShown: false }} />
      <Stack.Screen name="step4" options={{ headerShown: false }} />
      <Stack.Screen name="step5" options={{ headerShown: false }} />
      <Stack.Screen name="step6" options={{ headerShown: false }} />
      <Stack.Screen name="complete-profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CompleteProfileLayout;
