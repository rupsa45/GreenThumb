from fastapi import FastAPI, HTTPException
import numpy as np
import pandas as pd
from pydantic import BaseModel
import joblib
from ml_soilModel import get_soil_analysis
from weatherAPI import get_weekly_weather_data
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
    model = joblib.load('crop_production_model.pkl')
    crop_label_encoder = joblib.load('crop_label_encoder.pkl')
    state_label_encoder = joblib.load('state_label_encoder.pkl')
    df = pd.read_csv("crop_production.csv").dropna()
except Exception as e:
    raise RuntimeError(f"Failed to load resources: {e}")

# Define the request schema
class CropRequest(BaseModel):
    State: str  # New parameter for state name
    Rainfall: float  # New parameter for weekly rainfall
    Temperature: float  # New parameter for weekly temperature

class CropDetailRequest(BaseModel):
    state: str
    crop : str
    
class WeatherRequest(BaseModel):
    location: str 

# Request schema end


# Setting up the home API
@app.get("/")
def working():
    return { "Working"}

# API to predict crops, works using the request taken
@app.post("/predict-crop")
def predict_crop(request: CropRequest):
    
    """
    Predict the crop based on input features: State, Rainfall, and Temperature.
    """
    
    top_n = 10  # Number of top predictions to return
    
    # Converting the State name to lowercase
    request.State = request.State.lower()
    
    # Check if the state is in the encoder's classes before encoding
    if request.State not in state_label_encoder.classes_:
        return {"error": f"State '{request.State}' not found in the training data."}

    # Encode the state using the state encoder
    state_encoded = state_label_encoder.transform([request.State])[0]
    
    # Prepare the features for prediction
    input_data = pd.DataFrame({
        'State_Name': [state_encoded],
        'Rainfall': [request.Rainfall],
        'Temperature': [request.Temperature],
    })
    
    # Ensure the feature names match the trained models expected order
    input_data = input_data[['State_Name', 'Rainfall', 'Temperature']]

    # Make the prediction using the trained model
    probas = model.predict_proba(input_data)[0]
    
    # Get the top N most likely crops
    top_indices = np.argsort(probas)[-top_n:][::-1]  # Get indices of the top N probabilities
    
    # Decode the crop names
    top_crops = crop_label_encoder.inverse_transform(top_indices)
    
    # Get the corresponding probabilities, not really needed but for later on works it might come useful
    top_probabilities = probas[top_indices]

    # Return the crops with their probabilities as a list of dict
    return [{"crop": crop, "probability": prob} for crop, prob in zip(top_crops, top_probabilities)]


# Getting the required Crop details, requests taken : State name and Crop name
@app.post("/crop_details")
def crop_details(request: CropDetailRequest):
    """
    Fetch detailed information for a specific crop in a given state.
    """
    # COnverting to lowercase
    state = request.state.lower()
    crop = request.crop.lower()

    # Filter data for the selected state and crop
    data = df[
        (df['State_Name'].str.lower() == state) & 
        (df['Crop'].str.lower() == crop)
    ]

    if data.empty:
        raise HTTPException(status_code=404, detail=f"No data found for crop '{crop}' in state '{state}'.")

    # Calculate feature averages and total production 
    crop_details = {
        "state": state,
        "crop": crop,
        "N_mean": data['N'].mean(),
        "P_mean": data['P'].mean(),
        "K_mean": data['K'].mean(),
        "pH_mean": data['pH'].mean(),
        "Rainfall_mean": round(data['Rainfall'].mean(), 2),
        "Temperature_mean": round(data['Temperature'].mean(), 2),
        "Area_mean": round(data['Area_in_hectares'].mean(), 2),
        "Production_mean": round(data['Production_in_tons'].mean(), 2)
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
@app.post("/weekly-avg")
def get_weather_averages(request: WeatherRequest):
    """
    Fetch the average temperature and rainfall for the last 7 days in the given location.
    """
    try:
        weather_data = get_weekly_weather_data(request.location)
        return {"location": request.location, "avg_temp": round(weather_data['avg_temp'], 2), "avg_rainfall": round(weather_data['avg_rainfall'], 2)}
    except HTTPException as e:
        raise e