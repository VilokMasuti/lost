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
import { LogOut, Menu, User, Package } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Navigation routes configuration
  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    {
      href: "/lost-items",
      label: "Lost Items",
      active: pathname.startsWith("/lost-items")
    },
    {
      href: "/found-items",
      label: "Found Items",
      active: pathname.startsWith("/found-items")
    },
    {
      href: "/report-lost",
      label: "Report Lost",
      active: pathname === "/report-lost"
    },
    {
      href: "/report-found",
      label: "Report Found",
      active: pathname === "/report-found"
    },
  ]

  const userMenu = [
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4 mr-2" />
    },
    {
      href: "/my-items",
      label: "My Items",
      icon: <Package className="h-4 w-4 mr-2" />
    },
  ]

  const adminMenu = [
    {
      href: "/admin",
      label: "Admin",
      icon: <User className="h-4 w-4 mr-2" />
    }
  ]

  const handleSignOut = () => signOut({ callbackUrl: "/" })

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden mr-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px]">
            <nav className="flex flex-col gap-2 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`px-4 py-2 rounded-lg ${
                    route.active ? 'bg-accent' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Lost & Found</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 ml-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`hover:text-primary transition-colors ${
                route.active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* User controls */}
        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {session.user?.name || "User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {userMenu.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {session.user?.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    {adminMenu.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
