/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ItemCard } from '@/components/ItemCard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FoundItem, LostItem } from '@/types/index';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, MapPin, Phone, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function LostItemDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [item, setItem] = useState<LostItem | null>(null);
  const [matches, setMatches] = useState<FoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/lost-items/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }

        const data = await response.json();
        setItem(data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Failed to load item details');
        router.push('/lost-items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [params.id, router]);

  const fetchMatches = async () => {
    if (!item) return;

    setIsLoadingMatches(true);
    try {
      const response = await fetch(
        `/api/match-items?itemId=${item._id}&itemType=lost`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch potential matches');
      }

      const data = await response.json();
      setMatches(data.data);
    } catch (error) {
      toast.error('Failed to load potential matches');
    } finally {
      setIsLoadingMatches(false);
    }
  };

  const statusColor = {
    pending:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    matched: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    resolved:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold mb-2">Item not found</h2>
          <p className="text-muted-foreground mb-6">
            The item you&apos;re looking for doesn&apos;t exist or has been
            removed
          </p>
          <Button asChild>
            <Link href="/lost-items">Back to Lost Items</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/lost-items">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lost Items
        </Link>
      </Button>

      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription>Category: {item.category}</CardDescription>
                </div>
                <Badge className={statusColor[item.status]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {item.imageUrl && (
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={item.imageUrl || '/placeholder.svg'}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(
                        item.name
                      )}`;
                    }}
                  />
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{item.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Lost on: {format(new Date(item.dateLost), 'PPP')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Location: {item.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="matches">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="matches" onClick={fetchMatches}>
                Potential Matches
              </TabsTrigger>
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
            </TabsList>
            <TabsContent value="matches" className="p-4 border rounded-md mt-2">
              {isLoadingMatches ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.map((foundItem) => (
                    <ItemCard
                      key={foundItem._id}
                      item={foundItem}
                      type="found"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-semibold mb-2">
                    No matches found yet
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll keep looking for potential matches for your lost
                    item
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="contact" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Reported by: {item.userId}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Contact: {item.contactInfo}</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Please contact the person who reported this item if you have
                    any information about it.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Have you found this item?</CardTitle>
              <CardDescription>
                If you&apos;ve found an item matching this description, please
                report it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reporting a found item helps connect lost items with their
                owners.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/report-found">Report Found Item</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
