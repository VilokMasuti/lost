import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import Link from 'next/link';
import type { FoundItem, LostItem } from '../types/index';

interface ItemCardProps {
  item: LostItem | FoundItem;
  type: 'lost' | 'found';
}

export function ItemCard({ item, type }: ItemCardProps) {
  const date =
    type === 'lost'
      ? 'dateLost' in item
        ? item.dateLost
        : null
      : 'dateFound' in item
      ? item.dateFound
      : null;

  const formattedDate = date ? format(new Date(date), 'PPP') : 'Unknown date';

  const statusColor = {
    pending:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    matched: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    resolved:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge className={statusColor[item.status]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          {type === 'lost' ? 'Lost on: ' : 'Found on: '} {formattedDate}
        </CardDescription>
        <CardDescription>Location: {item.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-4">
          {item.imageUrl && (
            <div className="aspect-square w-full overflow-hidden rounded-md">
              <img
                src={item.imageUrl || '/placeholder.svg'}
                alt={item.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(
                    item.name
                  )}`;
                }}
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.description}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/${type}-items/${item._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
