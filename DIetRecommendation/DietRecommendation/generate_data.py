import pandas as pd
import numpy as np

np.random.seed(42)
num_samples = 500

data = {
    "calories_consumed": np.random.randint(1500, 3500, num_samples),
    "calories_burned": np.random.randint(1200, 3000, num_samples),
    "blood_sugar": np.random.uniform(80, 180, num_samples),
    "steps": np.random.randint(2000, 15000, num_samples),
    "sleep_hours": np.random.uniform(4, 9, num_samples),
}

def assign_diet(row):
    if row["calories_consumed"] > 3000:
        return "High-Protein Diet"
    elif row["blood_sugar"] > 140:
        return "Low-Carb Diet"
    elif row["calories_consumed"] < 1800:
        return "Low-Calorie Diet"
    else:
        return "Balanced Diet"

df = pd.DataFrame(data)
df["diet_plan"] = df.apply(assign_diet, axis=1)

df.to_csv("diet_data.csv", index=False)
print("Dataset saved as diet_data.csv")
