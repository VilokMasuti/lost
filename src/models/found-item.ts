import mongoose, { Schema, type Document } from 'mongoose';

export interface IFoundItem extends Document {
  userId: mongoose.Types.ObjectId;
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

const FoundItemSchema = new Schema<IFoundItem>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide an item name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
    },
    dateFound: {
      type: Date,
      required: [true, 'Please provide the date when the item was found'],
    },
    location: {
      type: String,
      required: [true, 'Please provide the location where the item was found'],
    },
    status: {
      type: String,
      enum: ['pending', 'matched', 'resolved'],
      default: 'pending',
    },
    contactInfo: {
      type: String,
      required: [true, 'Please provide contact information'],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
FoundItemSchema.index({ name: 'text', description: 'text', location: 'text' });

export default mongoose.models.FoundItem ||
  mongoose.model<IFoundItem>('FoundItem', FoundItemSchema);
