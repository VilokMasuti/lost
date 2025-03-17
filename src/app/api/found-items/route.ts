import dbConnect from '@/lib/mongodb';
import FoundItem from '@/models/found-item';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const foundItems = await FoundItem.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: foundItems },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
