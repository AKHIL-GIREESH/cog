import requests

url = "http://127.0.0.1:5000/get_diet"

sample_input = {
    "calories_consumed": 2500,
    "calories_burned": 1800,
    "blood_sugar": 150,
    "steps": 8000,
    "sleep_hours": 6
}



response = requests.post(url, json=sample_input)

if response.status_code == 200:
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Error: Received an invalid JSON response.")
        print("Raw Response:", response.text)
else:
    print(f"Error: Server returned status code {response.status_code}")
    print("Response:", response.text)
