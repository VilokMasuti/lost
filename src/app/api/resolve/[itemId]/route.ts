/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"
import FoundItem from "@/models/found-item"

export async function PUT(req: Request, { params }: { params: { itemId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

      // Check if user is admin or the owner of the item
      if (session.user.role !== "admin" && lostItem.userId !== session.user.id) {
        return NextResponse.json({ error: "You can only resolve your own items" }, { status: 403 })
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

      // Check if user is admin or the owner of the item
      if (session.user.role !== "admin" && foundItem.userId !== session.user.id) {
        return NextResponse.json({ error: "You can only resolve your own items" }, { status: 403 })
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

