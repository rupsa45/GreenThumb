const FASTAPI_URL = import.meta.env.VITE_FASTAPI_BASE_URL;
import axios from "axios";

export const fetchCrops = async (state) => {
  try {
    const response = await fetch(`${FASTAPI_URL}/predict_crops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch crop recommendations.");
    }

    const data = await response.json();
    return data.top_crops || [];
  } catch (err) {
    throw new Error(err.message);
  }
};



export const getCropDetails = async (state, crop) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/crop_details`, {
      state,
      crop,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Failed to fetch crop details"
    );
  }
};
