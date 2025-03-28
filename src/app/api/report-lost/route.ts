/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, category, dateLost, location, contactInfo, imageUrl } = body

    await dbConnect()

    const lostItem = await LostItem.create({
      userId: session.user.id,
      name,
      description,
      category,
      dateLost,
      location,
      contactInfo,
      imageUrl,
      status: "pending",
    })

    return NextResponse.json({ success: true, data: lostItem }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
