import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { inputs }: { inputs: number[] } = await request.json();

  if (!Array.isArray(inputs) || inputs.length !== 8) {
    return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
  }

  // Example model weights (you can use real ones from Python)
  const weights = [0.45, 1.2, 0.12, 0.05, 0.02, 0.85, 1.1, 0.3];
  const bias = -0.85;

  const score = inputs.reduce((sum, val, i) => sum + val * weights[i], bias);
  const probability = 1 / (1 + Math.exp(-score));
  const prediction = probability > 0.5 ? 'Diabetes Present' : 'Not Present';

  return NextResponse.json({ prediction, probability: probability.toFixed(2) });
}