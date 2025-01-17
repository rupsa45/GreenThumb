import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor

# Load the dataset
df = pd.read_csv("D:/mern-otp-auth/api/Crop_production.csv").dropna()

# Features and target for training
features = ['N', 'P', 'K', 'pH', 'Rainfall', 'Temperature', 'Area_in_hectares']
target = 'Production_in_tons'

# Train-test split
X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = DecisionTreeRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'crop_production_model.pkl')
