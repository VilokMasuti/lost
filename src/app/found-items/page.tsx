"use client"

import FoundItemCard from "@/components/FoundItemCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const FoundItemsPage = () => {
  interface FoundItem {
    _id: string
    name: string
    description: string
    location: string
    category: string
    status: string
    dateFound: string
    imageUrl?: string
  }

  const [items, setItems] = useState<FoundItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FoundItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("active")
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/found-items")
        if (!response.ok) throw new Error("Failed to fetch found items")

        const data = await response.json()
        const activeItems = data.data.filter((item: FoundItem) => item.status !== "resolved")
        setItems(activeItems)
        setFilteredItems(activeItems)
      } catch (error) {
        toast.error("Failed to load found items")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()
  }, [])
  useEffect(() => {
    let result = [...items]

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter)
    }

    // Status filter
    if (statusFilter === "all") {
      // Show all items including resolved
      result = [...result]
    } else if (statusFilter === "active") {
      result = result.filter((item) => item.status !== "resolved")
    } else {
      result = result.filter((item) => item.status === statusFilter)
    }

    setFilteredItems(result)
  }, [items, searchQuery, categoryFilter, statusFilter])
  if (isLoading) {
    return <div className="flex flex-col items-center justify-center py-20 w-full space-y-4">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-t-2 border-r-2 border-primary/30 rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-t-2 border-l-2 border-primary/60 rounded-full animate-spin animation-delay-150"></div>
      <div className="absolute inset-4 border-t-2 border-b-2 border-primary rounded-full animate-spin animation-delay-300"></div>
    </div>

  </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Found Items</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

<Select value={categoryFilter} onValueChange={setCategoryFilter}>
  <SelectTrigger>
    <SelectValue placeholder="All Categories" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Categories</SelectItem>
    <SelectItem value="electronics">Electronics</SelectItem>
    <SelectItem value="clothing">Clothing</SelectItem>
    <SelectItem value="documents">Documents</SelectItem>
    <SelectItem value="keys">Keys</SelectItem>
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>

<Select value={statusFilter} onValueChange={setStatusFilter}>
  <SelectTrigger>
    <SelectValue placeholder="Status Filter" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">All Active Items</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="matched">Matched</SelectItem>
    <SelectItem value="resolved">Resolved</SelectItem>
    <SelectItem value="all">Show All (Including Resolved)</SelectItem>
  </SelectContent>
</Select>
        <Link href="/app/found-items/create" passHref>
          <Button asChild>Create Found Item</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <FoundItemCard key={item._id} item={item} />
        ))}
      </div>
      </div>
  )
}

export default FoundItemsPage
