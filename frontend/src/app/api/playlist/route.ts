import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const response = await axios.post(`${backendUrl}/api/generate-playlist`, { prompt });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error proxying to Express:', error);
    return NextResponse.json({ error: 'Failed to generate playlist' }, { status: 500 });
  }
}