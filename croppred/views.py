from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import io
from .models import Imagy
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier


soil_type_nutrients = {
    'alluvial soil': {'nitrogen': 40, 'phosphorus': 55, 'potassium': 30, 'ph': 6.5},
    'clay soil': {'nitrogen': 55, 'phosphorus': 40, 'potassium': 20, 'ph': 7.2},
    'loam': {'nitrogen': 50, 'phosphorus': 50, 'potassium': 25, 'ph': 6.8},
    'black soil': {'nitrogen': 60, 'phosphorus': 35, 'potassium': 40, 'ph': 7.5},
    'red soil': {'nitrogen': 35, 'phosphorus': 60, 'potassium': 30, 'ph': 6.0},
    'silt soil': {'nitrogen': 45, 'phosphorus': 30, 'potassium': 28, 'ph': 6.2},
    'peat soil': {'nitrogen': 25, 'phosphorus': 20, 'potassium': 15, 'ph': 4.5},
    'chalky soil': {'nitrogen': 35, 'phosphorus': 25, 'potassium': 18, 'ph': 8.0},
}

def modelwwwwww():
    data = pd.read_csv('crop.csv')  # Replace with your dataset
    X = data.drop('label', axis=1)

    y = data['label']  # Target column

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = DecisionTreeClassifier(random_state=42)
    model.fit(X_train, y_train)
    return model

# Create your views here.
class ForcastPred(APIView):
    def post(self, request):
        arima_humid = joblib.load("arina_humid.pkl")
        arima_temp = joblib.load("arina_temp.pkl")
        arima_rain = joblib.load("arina_rainfall.pkl")
        forecast_temperature = arima_temp.forecast(steps=12)
        forecast_humidity = arima_humid.forecast(steps=12)
        forecast_rainfall = arima_rain.forecast(steps=12)
        forecast_rainfall_mm = (forecast_rainfall) * 250.4 # Convert inches to mm

        forecast_temperature = (forecast_temperature+10 - 32) * 5/9

        # Create a DataFrame to store forecast results
        forecast_results = {
            'temperature': forecast_temperature,
            'humidity': forecast_humidity,
            'rainfall': forecast_rainfall_mm
        }
        soil_image = request.FILES.get("soil")
        cwd = os.path.join('.',"soil."+soil_image.name.split('.')[-1])
        with open (cwd, "wb") as f:
            f.write(soil_image.read())
        user_soil_type = imagePred(load_img(cwd,target_size=(224,224))).lower()
        main_model = modelwwwwww()
        if user_soil_type in soil_type_nutrients:
            nutrients = soil_type_nutrients[user_soil_type]
        else:
            print("Invalid soil type entered. Please enter a valid soil type.")
        pred_df = pd.DataFrame({
            'nitrogen': [nutrients['nitrogen'] for i in range(12)],
            'phosphorus': [nutrients['phosphorus'] for i in range(12)],
            'potassium': [nutrients['potassium'] for i in range(12)],
            'temperature': forecast_temperature+5,
            'humidity': forecast_humidity,
            'ph': [nutrients['ph'] for i in range(12)],
            'rainfall': forecast_rainfall_mm
        })
        yearly_weather_conditions = pred_df
        yearly_crops = main_model.predict(yearly_weather_conditions)
        return Response({"list":yearly_crops, "soil":user_soil_type, "forcast":forecast_results})

def imagePred(image):
    classes = ["Alluvial Soil",
            "Black Soil",
            "Clay Soil",
            "Red Soil"
            ]
    model_path = "SoilNet_93_86.h5"

    SoilNet = load_model(model_path)
    image = img_to_array(image)
    image = image/255
    image = np.expand_dims(image,axis=0)
    result = np.argmax(SoilNet.predict(image))
    prediction = classes[result]
    return prediction