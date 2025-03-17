import dbConnect from '@/lib/mongodb';
import LostItem from '@/models/lost-item';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const lostItems = await LostItem.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: lostItems },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
