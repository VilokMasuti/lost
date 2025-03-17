'use client';

import { ItemCard } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type FoundItem, ITEM_CATEGORIES } from '@/types/index';
import { Plus, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function FoundItems() {
  const { data: session } = useSession();
  const [items, setItems] = useState<FoundItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/found-items');

        if (!response.ok) {
          throw new Error('Failed to fetch found items');
        }

        const data = await response.json();
        setItems(data.data);
        setFilteredItems(data.data);
      } catch (error) {
        toast.error('Failed to load found items');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let result = [...items];

    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    setFilteredItems(result);
  }, [items, searchQuery, categoryFilter, statusFilter]);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Found Items</h1>
          <p className="text-muted-foreground mt-2">
            Browse items that have been reported as found
          </p>
        </div>
        {session && (
          <Button asChild>
            <Link href="/report-found">
              <Plus className="mr-2 h-4 w-4" /> Report Found Item
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_200px_200px] mb-8">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, description, or location..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ITEM_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="matched">Matched</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold mb-2">
            No found items reported
          </h2>
          <p className="text-muted-foreground mb-6">
            {searchQuery || categoryFilter || statusFilter
              ? 'Try adjusting your filters'
              : 'Be the first to report a found item'}
          </p>
          {session && (
            <Button asChild>
              <Link href="/report-found">Report Found Item</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} type="found" />
          ))}
        </div>
      )}
    </div>
  );
}
