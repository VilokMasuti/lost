"use client"

import { ItemCard } from "@/components/ItemCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FoundItem, LostItem } from "@/types/index"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function MyItemsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lostItems, setLostItems] = useState<LostItem[]>([])
  const [foundItems, setFoundItems] = useState<FoundItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }

    if (session) {
      fetchItems()
    }
  }, [session, status, router])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Fetch lost items
      const lostResponse = await fetch("/api/my-items?type=lost")
      if (!lostResponse.ok) {
        throw new Error("Failed to fetch lost items")
      }
      const lostData = await lostResponse.json()
      setLostItems(lostData.data)

      // Fetch found items
      const foundResponse = await fetch("/api/my-items?type=found")
      if (!foundResponse.ok) {
        throw new Error("Failed to fetch found items")
      }
      const foundData = await foundResponse.json()
      setFoundItems(foundData.data)
    } catch (error) {
      toast.error("Failed to load your items")
    } finally {
      setIsLoading(false)
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Items</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/report-lost">
              <Plus className="mr-2 h-4 w-4" /> Report Lost
            </Link>
          </Button>
          <Button asChild>
            <Link href="/report-found">
              <Plus className="mr-2 h-4 w-4" /> Report Found
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="lost">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="lost">Lost Items</TabsTrigger>
          <TabsTrigger value="found">Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="lost">
          {lostItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-2">No lost items reported</h2>
              <p className="text-muted-foreground mb-6">You haven't reported any lost items yet</p>
              <Button asChild>
                <Link href="/report-lost">Report Lost Item</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lostItems.map((item) => (
                <ItemCard key={item._id} item={item} type="lost" />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="found">
          {foundItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-2">No found items reported</h2>
              <p className="text-muted-foreground mb-6">You haven't reported any found items yet</p>
              <Button asChild>
                <Link href="/report-found">Report Found Item</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundItems.map((item) => (
                <ItemCard key={item._id} item={item} type="found" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

