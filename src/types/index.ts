import type { User } from 'next-auth';

export interface ExtendedUser extends User {
  id: string;
  role: string;
}

export interface LostItem {
  _id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  dateLost: Date;
  location: string;
  status: 'pending' | 'matched' | 'resolved';
  contactInfo: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoundItem {
  _id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  dateFound: Date;
  location: string;
  status: 'pending' | 'matched' | 'resolved';
  contactInfo: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemMatch {
  lostItem: LostItem;
  foundItem: FoundItem;
  score: number;
}

export const ITEM_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Documents',
  'Keys',
  'Bags',
  'Wallets',
  'Jewelry',
  'Books',
  'Other',
];
