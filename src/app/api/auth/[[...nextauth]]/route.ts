import NextAuth from "next-auth";
import { authOptions } from "@/auth";

// NextAuth requires special handling for App Router
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
