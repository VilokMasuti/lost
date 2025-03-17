/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"
import FoundItem from "@/models/found-item"

export async function PUT(req: Request, { params }: { params: { itemId: string } }) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Only admins can resolve items" }, { status: 403 })
    }

    const { itemId } = params
    const body = await req.json()
    const { itemType, matchedItemId } = body

    await dbConnect()

    if (itemType === "lost") {
      const lostItem = await LostItem.findById(itemId)
      if (!lostItem) {
        return NextResponse.json({ error: "Lost item not found" }, { status: 404 })
      }

      const foundItem = await FoundItem.findById(matchedItemId)
      if (!foundItem) {
        return NextResponse.json({ error: "Found item not found" }, { status: 404 })
      }

      lostItem.status = "resolved"
      foundItem.status = "resolved"

      await lostItem.save()
      await foundItem.save()
    } else if (itemType === "found") {
      const foundItem = await FoundItem.findById(itemId)
      if (!foundItem) {
        return NextResponse.json({ error: "Found item not found" }, { status: 404 })
      }

      const lostItem = await LostItem.findById(matchedItemId)
      if (!lostItem) {
        return NextResponse.json({ error: "Lost item not found" }, { status: 404 })
      }

      foundItem.status = "resolved"
      lostItem.status = "resolved"

      await foundItem.save()
      await lostItem.save()
    } else {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
