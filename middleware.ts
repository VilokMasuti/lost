import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthenticated = !!session

  // Protected routes that require authentication
  const protectedRoutes = ["/report-lost", "/report-found", "/my-items", "/profile"]

  // Admin-only routes
  const adminRoutes = ["/admin"]

  const path = request.nextUrl.pathname

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => path.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  // Check if the route is admin-only and user is not an admin
  if (adminRoutes.some((route) => path.startsWith(route)) && (!isAuthenticated || session?.user.role !== "admin")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/report-lost/:path*", "/report-found/:path*", "/my-items/:path*", "/profile/:path*", "/admin/:path*"],
}

