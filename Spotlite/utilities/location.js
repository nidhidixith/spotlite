import * as Location from "expo-location";
import { Alert } from "react-native";

export const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    let address = null;
    const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode.length > 0) {
      const addr = geocode[0];
      console.log("Full Address: ", addr);
      // address = `${addr.name}, ${addr.street}, ${addr.city}, ${addr.region}, ${addr.country}`;
      address = `${addr.formattedAddress}`;
    }

    return {
      latitude,
      longitude,
      address,
    };
  } catch (error) {
    // console.warn("Error getting location:", error);
    Alert.alert(
      "Sorry, we need location permission to make this work!",
      "Please enable it from the app settings."
    );
    return null;
  }
};

// import * as Location from "expo-location";

// export const getUserLocation = async () => {
//   try {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       throw new Error("Permission to access location was denied");
//     }

//     const location = await Location.getCurrentPositionAsync({});
//     console.log("Co ords from getUserLocation: ", location.coords);
//     return location.coords; // { latitude, longitude }
//   } catch (error) {
//     console.warn("Error getting location:", error);
//     return null;
//   }
// };
