"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/lost-items",
      label: "Lost Items",
      active: pathname === "/lost-items",
    },
    {
      href: "/found-items",
      label: "Found Items",
      active: pathname === "/found-items",
    },
    {
      href: "/report-lost",
      label: "Report Lost",
      active: pathname === "/report-lost",
    },
    {
      href: "/report-found",
      label: "Report Found",
      active: pathname === "/report-found",
    },
  ]

  const adminRoutes = [
    {
      href: "/admin",
      label: "Dashboard",
      active: pathname === "/admin",
    },
  ]

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              {session?.user?.role === "admin" &&
                adminRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">Lost & Found</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`transition-colors hover:text-primary ${
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          {session?.user?.role === "admin" &&
            adminRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`transition-colors hover:text-primary ${
                  route.active ? "text-black dark:text-white" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-items" className="w-full">
                    My Items
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

