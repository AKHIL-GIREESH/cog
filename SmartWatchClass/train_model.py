import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.utils import resample

# Load dataset
file_path = "smartwatch_health_data.csv"
df = pd.read_csv(file_path)

# Categorize health score
def categorize_health(score):
    if score >= 60:
        return "Healthy"
    elif 30 <= score < 60:
        return "At Risk"
    else:
        return "Not Healthy"

df["health_status"] = df["health_score"].apply(categorize_health)

# Balance the dataset to prevent bias
df_healthy = df[df["health_status"] == "Healthy"]
df_at_risk = df[df["health_status"] == "At Risk"]
df_not_healthy = df[df["health_status"] == "Not Healthy"]

max_size = max(len(df_healthy), len(df_at_risk), len(df_not_healthy))
df_healthy = resample(df_healthy, replace=True, n_samples=max_size, random_state=42)
df_at_risk = resample(df_at_risk, replace=True, n_samples=max_size, random_state=42)
df_not_healthy = resample(df_not_healthy, replace=True, n_samples=max_size, random_state=42)

df_balanced = pd.concat([df_healthy, df_at_risk, df_not_healthy])

# Prepare features and target
X = df_balanced.drop(columns=["health_score", "health_status"])
y = df_balanced["health_status"]

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

# Standardize data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Logistic Regression model
# logistic_model = LogisticRegression(solver="lbfgs", max_iter=500, random_state=42)
logistic_model = LogisticRegression(solver="lbfgs", max_iter=500, random_state=42, multi_class="multinomial")
logistic_model.fit(X_train_scaled, y_train)

# Save model, scaler, and label encoder
joblib.dump(logistic_model, "logistic_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

# Check model on an unhealthy case
test_unhealthy = pd.DataFrame([[88, 176, 67, 4.22, 13761, 2169, 86.98]], columns=X.columns)
test_scaled = scaler.transform(test_unhealthy)
predicted_label = logistic_model.predict(test_scaled)
decoded_prediction = label_encoder.inverse_transform(predicted_label)

print("🚨 Model Test Prediction for Unhealthy Data:", decoded_prediction)  # Expected: "Not Healthy"
