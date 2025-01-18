from datetime import datetime, timedelta
import requests
from fastapi import HTTPException

BASE_URL = "http://api.weatherapi.com/v1/history.json"
API_KEY = "eb45feb6ff814cce95b55838232412"  # Your API Key

# Helper function to fetch weather data for the past 7 days
def get_weekly_weather_data(location: str):
    start_date = datetime.now() - timedelta(days=7)
    total_avg_temp = 0
    total_rainfall = 0
    day_count = 0
    
    for i in range(7):  # For the past 7 days
        date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        response = requests.get(BASE_URL, params={"key": API_KEY, "q": location, "dt": date})
        
        if response.status_code == 200:
            data = response.json()
            forecast = data["forecast"]["forecastday"][0]["day"]

            # Calculate the daily average temperature
            max_temp = forecast['maxtemp_c']
            min_temp = forecast['mintemp_c']
            avg_temp = (max_temp + min_temp) / 2
            
            # Get the rainfall for the day
            rainfall = forecast['totalprecip_mm']

            # Add to weekly totals
            total_avg_temp += avg_temp
            total_rainfall += rainfall
            day_count += 1
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Error fetching data for {date}")

    # Calculate the weekly average temperature and rainfall
    if day_count > 0:
        weekly_avg_temp = total_avg_temp / day_count
        weekly_avg_rainfall = total_rainfall / day_count
        return {"avg_temp": weekly_avg_temp, "avg_rainfall": weekly_avg_rainfall}
    else:
        raise HTTPException(status_code=404, detail="No valid data found for the specified location")
