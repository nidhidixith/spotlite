import { View, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

const CustomBottomSheetModal = forwardRef((props, ref) => {
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={props.snapPoints}
      enablePanDownToClose={true}
      // backgroundStyle={{ backgroundColor: "black" }}
      backdropComponent={renderBackdrop}
    >
      <View className="flex-1">{props.children}</View>
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
