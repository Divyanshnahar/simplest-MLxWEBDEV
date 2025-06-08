import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_csv("/Users/divyanshnahar/Desktop/cohort/projects/diabetes-predictor/ML_train/diabetes.csv")  # assuming GFG dataset is like Pima

# Features and label
X = df.drop("Outcome", axis=1)
y = df["Outcome"]

# Normalize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train logistic regression
model = LogisticRegression()
model.fit(X_train, y_train)

# Output model weights
print("Intercept (bias):", model.intercept_[0])
print("Coefficients (weights):", model.coef_[0])