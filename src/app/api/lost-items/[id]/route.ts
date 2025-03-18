/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const lostItem = await LostItem.findById(params.id)

    if (!lostItem) {
      return NextResponse.json({ error: "Lost item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: lostItem }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

