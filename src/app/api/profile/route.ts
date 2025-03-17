/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/users"

export async function PUT(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    await dbConnect()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    user.name = name
    await user.save()

    return NextResponse.json({ success: true, data: { name: user.name } }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
