import mongoose from "mongoose"

const LostItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "matched", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true },
)

// Add text index for search functionality
LostItemSchema.index({ name: "text", description: "text", location: "text" })

export default mongoose.models.LostItem || mongoose.model("LostItem", LostItemSchema)

