/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"
import FoundItem from "@/models/found-item"

export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const type = url.searchParams.get("type")

    if (!type || (type !== "lost" && type !== "found")) {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 })
    }

    await dbConnect()

    let items = []

    if (type === "lost") {
      items = await LostItem.find({ userId: session.user.id }).sort({ createdAt: -1 })
    } else {
      items = await FoundItem.find({ userId: session.user.id }).sort({ createdAt: -1 })
    }

    return NextResponse.json({ success: true, data: items }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
