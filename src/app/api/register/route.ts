import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      role: "user",
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
