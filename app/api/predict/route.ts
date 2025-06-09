import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { inputs }: { inputs: number[] } = await request.json();

  if (!Array.isArray(inputs) || inputs.length !== 8) {
    return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
  }

  // Example model weights (you can use real ones from Python)
  const weights = [ 0.21624195,  1.06932996, -0.25867641,  0.04720329, -0.19899822,  0.79237086,  0.22709403,  0.43036184];

  const bias = -0.8559494150701518;

  const score = inputs.reduce((sum, val, i) => sum + val * weights[i], bias);
  const probability = 1 / (1 + Math.exp(-score));
  const prediction = probability > 0.5 ? 'Diabetes Present' : 'Not Present';

  return NextResponse.json({ prediction, probability: probability });
}