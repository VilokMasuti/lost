/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"
import FoundItem from "@/models/found-item"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const itemId = url.searchParams.get("itemId")
    const itemType = url.searchParams.get("itemType")

    if (!itemId || !itemType) {
      return NextResponse.json({ error: "Item ID and type are required" }, { status: 400 })
    }

    await dbConnect()

    let item
    let potentialMatches = []

    if (itemType === "lost") {
      item = await LostItem.findById(itemId)
      if (!item) {
        return NextResponse.json({ error: "Lost item not found" }, { status: 404 })
      }

      // Find potential matches in found items
      potentialMatches = await FoundItem.find({
        status: "pending",
        $text: {
          $search: `${item.name} ${item.description} ${item.location}`,
        },
      })
        .sort({ score: { $meta: "textScore" } })
        .limit(10)
    } else if (itemType === "found") {
      item = await FoundItem.findById(itemId)
      if (!item) {
        return NextResponse.json({ error: "Found item not found" }, { status: 404 })
      }

      // Find potential matches in lost items
      potentialMatches = await LostItem.find({
        status: "pending",
        $text: {
          $search: `${item.name} ${item.description} ${item.location}`,
        },
      })
        .sort({ score: { $meta: "textScore" } })
        .limit(10)
    } else {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: potentialMatches }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
