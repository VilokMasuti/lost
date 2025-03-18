"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserInfo() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">{session.user.name}</p>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Role: {session.user.role === "admin" ? "Administrator" : "User"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

