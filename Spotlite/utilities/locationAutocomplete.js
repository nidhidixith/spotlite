import axios from "axios";
const MY_API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

export const locationAutocomplete = async (text) => {
  // if (text.length < 5) return;
  if (!text || text.length < 5) return [];

  try {
    const res = await axios.get(`https://api.locationiq.com/v1/autocomplete`, {
      params: {
        key: MY_API_KEY,
        q: text,
        limit: 5,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching location suggestions:", err);
    return [];
  }
};
