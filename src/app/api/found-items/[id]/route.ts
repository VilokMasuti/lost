/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import FoundItem from "@/models/found-item"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Only admins can delete items" }, { status: 403 })
    }

    await dbConnect()

    const foundItem = await FoundItem.findByIdAndDelete(params.id)

    if (!foundItem) {
      return NextResponse.json({ error: "Found item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
