from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model, scaler, and label encoder
logistic_model = joblib.load("logistic_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Define feature columns
feature_columns = ["heart_rate", "blood_pressure_sys", "blood_pressure_dia", "sleep_duration", "step_count", "calories_burned", "oxygen_saturation"]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        input_data = pd.DataFrame([data], columns=feature_columns)

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)

        # Predict class probabilities
        predicted_proba = logistic_model.predict_proba(input_data_scaled)  
        predicted_label = logistic_model.predict(input_data_scaled)
        predicted_status = label_encoder.inverse_transform(predicted_label)[0]

        # Get probability scores
        class_probabilities = dict(zip(label_encoder.classes_, predicted_proba[0]))
        max_class = max(class_probabilities, key=class_probabilities.get)

        if max_class == "Healthy":
            health_score = 70 + (class_probabilities["Healthy"] * 30)  # 70 to 100
        elif max_class == "At Risk":
            health_score = 40 + (class_probabilities["At Risk"] * 30)  # 40 to 70
        else:
            health_score = class_probabilities["Not Healthy"] * 40  # 0 to 40

        health_score = round(health_score, 2)

        health_score = round(health_score, 2)  # Round for better readability

        return jsonify({
            "health_status": predicted_status,
            "health_score": health_score,
            "confidence_scores": class_probabilities
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
