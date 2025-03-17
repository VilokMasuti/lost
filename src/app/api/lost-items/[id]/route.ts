import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import LostItem from "@/models/lost-item"

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

    const lostItem = await LostItem.findByIdAndDelete(params.id)

    if (!lostItem) {
      return NextResponse.json({ error: "Lost item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
