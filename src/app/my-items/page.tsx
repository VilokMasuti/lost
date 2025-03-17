/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ItemCard } from '@/components/ItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FoundItem, LostItem } from '@/types/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MyItems() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [myLostItems, setMyLostItems] = useState<LostItem[]>([]);
  const [myFoundItems, setMyFoundItems] = useState<FoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    const fetchMyItems = async () => {
      try {
        const [lostResponse, foundResponse] = await Promise.all([
          fetch('/api/my-items?type=lost'),
          fetch('/api/my-items?type=found'),
        ]);

        if (!lostResponse.ok || !foundResponse.ok) {
          throw new Error('Failed to fetch items');
        }

        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        setMyLostItems(lostData.data);
        setMyFoundItems(foundData.data);
      } catch (error) {
        toast.error('Failed to load your items');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchMyItems();
    }
  }, [session, status, router]);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Items</h1>

      <Tabs defaultValue="lost">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="lost">My Lost Items</TabsTrigger>
          <TabsTrigger value="found">My Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="lost">
          {myLostItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-2">
                You haven&apos;t reported any lost items
              </h2>
              <p className="text-muted-foreground mb-6">
                Report a lost item to start tracking it
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myLostItems.map((item) => (
                <ItemCard key={item._id} item={item} type="lost" />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="found">
          {myFoundItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-2">
                You haven&apos;t reported any found items
              </h2>
              <p className="text-muted-foreground mb-6">
                Report a found item to help others find their belongings
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myFoundItems.map((item) => (
                <ItemCard key={item._id} item={item} type="found" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
