import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv("crop_production.csv").dropna()

# Features and target for training
features = ['State_Name', 'Rainfall', 'Temperature']
target = 'Crop'

# Encode the 'State_Name' feature using LabelEncoder
state_encoder = LabelEncoder()
df['State_Name'] = state_encoder.fit_transform(df['State_Name'])

# Encode the target variable (Crop) using LabelEncoder
label_encoder = LabelEncoder()
df[target] = label_encoder.fit_transform(df[target])

# Train-test split
X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'crop_production_model.pkl')

# Save the label encoder for the target variable (Crop)
joblib.dump(label_encoder, 'crop_label_encoder.pkl')

# Save the label encoder for the 'State_Name' feature
joblib.dump(state_encoder, 'state_label_encoder.pkl')
