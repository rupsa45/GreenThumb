from fastapi import FastAPI, HTTPException
import numpy as np
import pandas as pd
from pydantic import BaseModel
import joblib
from ml_soilModel import get_soil_analysis
from monthly_data import get_last_30_day_weather
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the frontend URL for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load the trained models and dataset
try:
    trained_crop_model = joblib.load("trained_models/crop_recommendation_model.pkl")
    label_encoder = joblib.load("trained_models/label_encoder.pkl")
   
    df = pd.read_csv("Datasets/Crop_recommendation.csv").dropna()
except Exception as e:
    raise RuntimeError(f"Failed to load resources: {e}")

# Define the request schema
class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    rainfall: float

class CropDetailRequest(BaseModel):
    crop : str
    
class CityRequest(BaseModel):
    city: str 

# Request schema end


# Setting up the home API
@app.get("/")
def working():
    return { "Working"}

# API to predict crops, works using the request taken
@app.post("/predict_crop")
def predict_crop(request: CropRequest):
    """
    Predict the top crops based on soil and climate features.
    """
    top_n = 6

    # Prepare input data
    input_df = pd.DataFrame([[
        request.N,
        request.P,
        request.K,
        request.temperature,
        request.humidity,
        request.rainfall
    ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'rainfall'])

    # Predict probabilities
    probas = trained_crop_model.predict_proba(input_df)[0]

    # Get top N crop indices
    top_indices = np.argsort(probas)[-top_n:][::-1]
    
    # Get crop names and probabilities
    top_crops = label_encoder.inverse_transform(top_indices)
    top_probabilities = probas[top_indices]

    # Return results
    return [{"crop": crop, "probability": float(f"{prob:.2f}")} for crop, prob in zip(top_crops, top_probabilities)]


# Getting the required Crop details, requests taken : State name and Crop name
@app.post("/crop_details")
def crop_details(request: CropDetailRequest):
    """
    Fetch detailed information for a specific crop.
    """
    crop = request.crop.strip().lower()

    # Filter rows by crop name only
    filtered = df[df['label'].str.lower() == crop]

    if filtered.empty:
        raise HTTPException(status_code=404, detail=f"No data found for crop '{crop}'.")

    # Calculate feature averages
    crop_details = {
        "crop": crop.title(),
        "N_mean": round(filtered['N'].mean(), 2),
        "P_mean": round(filtered['P'].mean(), 2),
        "K_mean": round(filtered['K'].mean(), 2),
        "temperature_mean": round(filtered['temperature'].mean(), 2),
        "humidity_mean": round(filtered['humidity'].mean(), 2),
        "rainfall_mean": round(filtered['rainfall'].mean(), 2)
    }

    return {"crop_details": crop_details}



# Api to get soil analysis, like types of soil and the percentage values they are found in
@app.get("/soil_analysis")
def soil_analysis(state: str):
    """
    :param state: Name of the state (case-insensitive)
    :return: Soil types and NPK values for the given state
    """
    result = get_soil_analysis(state)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])

    return result

# API to get Weekly average temprature and Rainfall data
@app.post("/monthly-avg")
def weather_summary(request: CityRequest):
    try:
        result = get_last_30_day_weather(request.city)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except EnvironmentError as ee:
        raise HTTPException(status_code=500, detail=str(ee))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")