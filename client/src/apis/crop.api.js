const FASTAPI_URL = import.meta.env.VITE_FASTAPI_BASE_URL;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
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


export const fetchCropImage = async (cropName) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos`,
    {
      params: {
        query: `${cropName}`,
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  console.log(cropName);
  

  if (response.data.results.length > 0) {
    return response.data.results[0].urls.regular;
  } else {
    return "/placeholder.svg"; // fallback
  }
};

export const getFertilizer = async(crop)=>{
  try {
    const response = await axios.post(`${FASTAPI_URL}/get-fertilizer`, {
      crop
    });
    return response.data;
  } catch (error) {
    console.log("Error while fetching fertilizer details",error); 
  }
}