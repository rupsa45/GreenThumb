import pandas as pd
import joblib

# Load the dataset and the trained model
df = pd.read_csv("crop_production.csv").dropna()
model = joblib.load("crop_production_model.pkl")

# Features used in the model
features = ['N', 'P', 'K', 'pH', 'Rainfall', 'Temperature', 'Area_in_hectares']

def predict_crops_based_on_location(state, temperature, rainfall_week):
    """
    Predict suitable crops for a given state, temperature, and weekly rainfall.
    :param state: The name of the state (case-insensitive)
    :param temperature: The average temperature in degrees Celsius
    :param rainfall_week: The total rainfall in mm over the last week
    :return: Top 5 crop recommendations
    """
    state = state.lower()

    # Check if state exists in the dataset
    if state not in df['State_Name'].str.lower().unique():
        return {"error": f"State '{state}' not found in the dataset."}

    # Filter dataset for the given state
    state_data = df[df['State_Name'].str.lower() == state]

    # Calculate average weekly rainfall if rainfall_week is provided
    if rainfall_week > 0:
        rainfall = rainfall_week
    else:
        rainfall = state_data['Rainfall'].mean()  # Use the mean rainfall if no data is available

    # Use mean values of N, P, K, pH, Rainfall, and Area_in_hectares as input
    input_features = {
        "N": state_data["N"].mean(),
        "P": state_data["P"].mean(),
        "K": state_data["K"].mean(),
        "pH": state_data["pH"].mean(),
        "Rainfall": rainfall,  # Use the calculated or input rainfall value
        "Temperature": temperature,
        "Area_in_hectares": state_data["Area_in_hectares"].mean(),
    }

    # Convert input features to a DataFrame for the model
    input_df = pd.DataFrame([input_features])

    # Predict production values for all crops in the state
    state_data["Predicted_Production"] = model.predict(state_data[features])

    # Get the top 5 crops with the highest predicted production
    top_crops = (
        state_data.groupby("Crop")["Predicted_Production"]
        .sum()
        .nlargest(5)
        .index.tolist()
    )

    return {"state": state, "temperature": temperature, "weekly_rainfall": rainfall, "top_crops": top_crops}
