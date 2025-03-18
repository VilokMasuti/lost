/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import FoundItem from "@/models/found-item"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const foundItem = await FoundItem.findById(params.id)

    if (!foundItem) {
      return NextResponse.json({ error: "Found item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: foundItem }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

