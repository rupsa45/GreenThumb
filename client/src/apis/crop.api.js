const FASTAPI_URL = import.meta.env.VITE_FASTAPI_BASE_URL;
import axios from "axios";

// Function to fetch weekly average data
export const fetchmonthylyAvg = async (city) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/monthly-avg`, {
      city,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly average data:", error);
  }
};

export const predictCrop = async (N, P, K, temperature, humidity, rainfall) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/predict_crop`, {
      N,
      P,
      K,
      temperature,
      humidity,
      rainfall,
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting crop:", error);
    return []; // avoid breaking UI
  }
};


export const fetchCrops = async (state) => {
  try {
    const response = await fetch(`${FASTAPI_URL}/predict-crop`, {
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



export const getCropDetails = async (crop) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/crop_details`, {
      crop,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Failed to fetch crop details"
    );
  }
};
