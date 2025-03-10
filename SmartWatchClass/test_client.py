import requests

url = "http://127.0.0.1:5000/predict"

# Example: Clearly unhealthy data
data = {
    "heart_rate": 50,
    "blood_pressure_sys": 90,
    "blood_pressure_dia": 60,
    "sleep_duration": 3,
    "step_count": 1000,
    "calories_burned": 800,
    "oxygen_saturation": 85
}

# 50, 90, 60, 3, 1000, 800, 85

response = requests.post(url, json=data)
print(response.json())  # Expected Output: {"health_status": "Not Healthy"}
