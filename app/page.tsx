'use client';

import { useState } from 'react';

const fieldNames = [
  'Pregnancies',
  'Glucose',
  'BloodPressure',
  'SkinThickness',
  'Insulin',
  'BMI',
  'DiabetesPedigreeFunction',
  'Age',
];

export default function Home() {
  const [inputs, setInputs] = useState<string[]>(Array(8).fill(''));
  const [result, setResult] = useState<string | null>(null);
  const [prob, setProb] = useState<number | null>(null);
  

  const handleChange = (i: number, value: string) => {
    const updated = [...inputs];
    updated[i] = value;
    setInputs(updated);
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: inputs.map(Number) }),
    });
    const data = await res.json();
    setResult(data.prediction);
    setProb(data.probability);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Diabetes Predictor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {fieldNames.map((label, index) => (
          <input
            key={index}
            type="number"
            placeholder={label}
            value={inputs[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            className="p-2 border rounded"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Predict
      </button>
      {result && (
        <p className="mt-4 text-xl">
          Prediction: <span className="font-semibold">{result}</span>
          <br />
          Probability: <span className="font-semibold">{prob}</span>

        </p>
      )}
    </main>
  );
}