import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

const AnimatedCounter = ({ value, duration = 1000 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value]);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return Math.floor(num / 1_000_000_000) + "B";
    if (num >= 1_000_000) return Math.floor(num / 1_000_000) + "M";
    if (num >= 1_000) return Math.floor(num / 1_000) + "K";
    return num.toString();
  };

  return <Text>{formatNumber(displayValue)}</Text>;
};

export default AnimatedCounter;
