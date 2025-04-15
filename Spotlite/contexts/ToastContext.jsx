import React, { createContext, useContext, useState, useRef } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    visible: false,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true, // Make sure it works for opacity
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToast({ message: "", type, visible: false }));
    }, 3000);
  };

  const handleToastClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setToast({ message: "", type: "success", visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            right: 10,
            borderLeftColor: toast.type === "success" ? "#10b981" : "#ef4444", // green-500 or red-500
            borderRightColor: "#e5e7eb", // gray-200
            borderTopColor: "#e5e7eb",
            borderBottomColor: "#e5e7eb",
            borderWidth: 1,
            borderLeftWidth: 5,
            backgroundColor: toast.type === "success" ? "#ecfdf5" : "#fef2f2", // green-50 or red-50
            padding: 10,
            borderRadius: 5,
            opacity: fadeAnim,
            justifyContent: "center",
            display: toast.message ? "flex" : "none",
            // Optional shadows
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <View className="flex flex-row">
            <MaterialIcons
              name={toast.type === "success" ? "check-circle" : "error"}
              size={18}
              color={toast.type === "success" ? "#10b981" : "#ef4444"} // icon color
              style={{ marginRight: 8, marginTop: 4 }}
            />

            <View className="flex-1">
              <View className="flex flex-row">
                <Text
                  className={`text-base font-semibold ${
                    toast.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {toast.type === "success" ? "Success" : "Error"}
                </Text>

                <TouchableOpacity
                  className="self-center ml-auto p-1"
                  onPress={handleToastClose}
                >
                  <MaterialIcons name="close" size={18} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <Text className="text-sm text-gray-700">{toast.message}</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};
