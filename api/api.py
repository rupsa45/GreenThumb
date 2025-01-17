from fastapi import FastAPI, HTTPException
import pandas as pd
from pydantic import BaseModel
import joblib
from ml_soilModel import get_soil_analysis
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Change to specific origins for better security.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the trained model and dataset
try:
    model = joblib.load('crop_production_model.pkl')
    df = pd.read_csv("crop_production.csv").dropna()
except Exception as e:
    raise RuntimeError(f"Failed to load resources: {e}")

# Define the request schema
class CropRequest(BaseModel):
    state: str

class CropDetailRequest(BaseModel):
    state: str
    crop: str

# Feature list (used in the ML model)
features = ['N', 'P', 'K', 'pH', 'Rainfall', 'Temperature', 'Area_in_hectares']

@app.get("/")
def working():
    return { "Working"}

@app.post("/predict_crops")
def predict_crops(request: CropRequest):
    """
    Predict the top 5 crops based on the state.
    """
    state = request.state.lower()

    if state not in df['State_Name'].str.lower().unique():
        raise HTTPException(status_code=404, detail=f"State '{state}' not found in the dataset.")

    # Filter crops for the state and calculate total production
    state_data = df[df['State_Name'].str.lower() == state]
    top_crops = state_data.groupby('Crop')['Production_in_tons'].sum().nlargest(5).index.tolist()

    return {"state": request.state, "top_crops": top_crops}


@app.post("/crop_details")
def crop_details(request: CropDetailRequest):
    """
    Fetch detailed information for a specific crop in a given state.
    """
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

@app.get("/soil_analysis")
def soil_analysis(state: str):
    """
    FastAPI GET endpoint for soil analysis.
    :param state: Name of the state (case-insensitive)
    :return: Soil types and NPK values for the given state
    """
    result = get_soil_analysis(state)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])

    return result