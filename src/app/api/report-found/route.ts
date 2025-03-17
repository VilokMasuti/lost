/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import FoundItem from "@/models/found-item"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, category, dateFound, location, contactInfo, imageUrl } = body

    await dbConnect()

    const foundItem = await FoundItem.create({
      userId: session.user.id,
      name,
      description,
      category,
      dateFound,
      location,
      contactInfo,
      imageUrl,
      status: "pending",
    })

    return NextResponse.json({ success: true, data: foundItem }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
