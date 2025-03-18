"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FoundItem {
  _id: string
  name: string
  description: string
  location: string
  category: string
  dateFound: string
  imageUrl?: string
}

interface FoundItemCardProps {
  item: FoundItem
}

const FoundItemCard: React.FC<FoundItemCardProps> = ({ item }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.category}</CardDescription>
      </CardHeader>
      <CardContent>
        {item.imageUrl && (
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-cover mb-2" />
        )}
        <p>{item.description}</p>
        <p>Location: {item.location}</p>
        <p>Date Found: {item.dateFound}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/found-items/${item._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FoundItemCard

