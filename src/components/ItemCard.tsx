import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { FoundItem, LostItem } from "@/types/index"
import { format } from "date-fns"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

interface ItemCardProps {
  item: LostItem | FoundItem
  type: "lost" | "found"
}

export function ItemCard({ item, type }: ItemCardProps) {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    matched: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  }

  const date = type === "lost" ? (item as LostItem).dateLost : (item as FoundItem).dateFound

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge className={statusColor[item.status]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      {item.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.name)}`
            }}
          />
        </div>
      )}
      <CardContent className="p-4 pt-2">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{item.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{format(new Date(date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/${type}-items/${item._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

