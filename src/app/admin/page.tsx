/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FoundItem, LostItem } from "@/types/index"
import { format } from "date-fns"
import { Check, Trash } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lostItems, setLostItems] = useState<LostItem[]>([])
  const [foundItems, setFoundItems] = useState<FoundItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLostItem, setSelectedLostItem] = useState<string>("")
  const [selectedFoundItem, setSelectedFoundItem] = useState<string>("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session && session.user.role !== "admin") {
      router.push("/")
      return
    }

    if (session && session.user.role === "admin") {
      fetchItems()
    }
  }, [session, status, router])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Fetch lost items
      const lostResponse = await fetch("/api/lost-items")
      if (!lostResponse.ok) {
        throw new Error("Failed to fetch lost items")
      }
      const lostData = await lostResponse.json()
      setLostItems(lostData.data)

      // Fetch found items
      const foundResponse = await fetch("/api/found-items")
      if (!foundResponse.ok) {
        throw new Error("Failed to fetch found items")
      }
      const foundData = await foundResponse.json()
      setFoundItems(foundData.data)
    } catch (error) {
      toast.error("Failed to load items")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteLostItem = async (id: string) => {
    try {
      const response = await fetch(`/api/lost-items/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete lost item")
      }

      setLostItems(lostItems.filter((item) => item._id !== id))
      toast.success("Lost item deleted successfully")
    } catch (error) {
      toast.error("Failed to delete lost item")
    }
  }

  const handleDeleteFoundItem = async (id: string) => {
    try {
      const response = await fetch(`/api/found-items/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete found item")
      }

      setFoundItems(foundItems.filter((item) => item._id !== id))
      toast.success("Found item deleted successfully")
    } catch (error) {
      toast.error("Failed to delete found item")
    }
  }

  const handleResolveItems = async () => {
    if (!selectedLostItem || !selectedFoundItem) {
      toast.error("Please select both a lost and found item to match")
      return
    }

    try {
      const response = await fetch(`/api/resolve/${selectedLostItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemType: "lost",
          matchedItemId: selectedFoundItem,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to resolve items")
      }

      // Update local state
      setLostItems(lostItems.map((item) => (item._id === selectedLostItem ? { ...item, status: "resolved" } : item)))
      setFoundItems(foundItems.map((item) => (item._id === selectedFoundItem ? { ...item, status: "resolved" } : item)))

      setSelectedLostItem("")
      setSelectedFoundItem("")
      toast.success("Items matched and resolved successfully")
    } catch (error) {
      toast.error("Failed to resolve items")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Match Items</CardTitle>
            <CardDescription>Select a lost item and a found item to mark them as matched and resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Lost Item</label>
                <Select value={selectedLostItem} onValueChange={setSelectedLostItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lost item" />
                  </SelectTrigger>
                  <SelectContent>
                    {lostItems
                      .filter((item) => item.status === "pending")
                      .map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name} - {item.location}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Found Item</label>
                <Select value={selectedFoundItem} onValueChange={setSelectedFoundItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a found item" />
                  </SelectTrigger>
                  <SelectContent>
                    {foundItems
                      .filter((item) => item.status === "pending")
                      .map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name} - {item.location}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleResolveItems} disabled={!selectedLostItem || !selectedFoundItem} className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Mark as Matched and Resolved
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lost">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="lost">Lost Items</TabsTrigger>
          <TabsTrigger value="found">Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="lost">
          <Card>
            <CardHeader>
              <CardTitle>Lost Items</CardTitle>
              <CardDescription>Manage all reported lost items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date Lost</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lostItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No lost items reported
                      </TableCell>
                    </TableRow>
                  ) : (
                    lostItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{format(new Date(item.dateLost), "MMM d, yyyy")}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "matched"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteLostItem(item._id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="found">
          <Card>
            <CardHeader>
              <CardTitle>Found Items</CardTitle>
              <CardDescription>Manage all reported found items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date Found</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foundItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No found items reported
                      </TableCell>
                    </TableRow>
                  ) : (
                    foundItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{format(new Date(item.dateFound), "MMM d, yyyy")}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "matched"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteFoundItem(item._id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

