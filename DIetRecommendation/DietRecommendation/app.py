from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)
model = joblib.load("diet_recommendation_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
scaler = joblib.load("scaler.pkl")

@app.route('/',methods=['GET'])
def home():
    return "Diet Recommendation API"

@app.route('/get_diet', methods=['POST'])
def get_diet():
    data = request.json
    input_data = pd.DataFrame([[
        data["calories_consumed"],
        data["calories_burned"],
        data["blood_sugar"],
        data["steps"],
        data["sleep_hours"]
    ]], columns=["calories_consumed", "calories_burned", "blood_sugar", "steps", "sleep_hours"])
    
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)[0]
    recommended_diet = label_encoder.inverse_transform([prediction])[0]
    
    diet_recommendations = {
        "Low-Carb Diet": [
            "Reduce processed sugar and refined carbs.",
            "Increase fiber intake (vegetables, whole grains).",
            "Eat lean proteins (chicken, fish, tofu)."
        ],
        "High-Protein Diet": [
            "Increase protein intake (chicken, eggs, tofu).",
            "Add healthy fats (avocados, nuts).",
            "Ensure balanced hydration & electrolyte intake."
        ],
        "Low-Calorie Diet": [
            "Reduce portion sizes and avoid sugary drinks.",
            "Eat more fiber-rich foods (fruits, vegetables).",
            "Choose lean protein sources (fish, legumes)."
        ],
        "Balanced Diet": [
            "Maintain a mix of carbs, proteins, and healthy fats.",
            "Stay hydrated with at least 2L of water daily.",
            "Eat at regular intervals to maintain metabolism."
        ]
    }
    
    return jsonify({
        "diet_plan": recommended_diet,
        "recommendations": diet_recommendations.get(recommended_diet, ["Follow a balanced and healthy diet."])
    })

if __name__ == '__main__':
    app.run(debug=True)
