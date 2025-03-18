import mongoose from "mongoose"

const FoundItemSchema = new mongoose.Schema(
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
    dateFound: {
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
FoundItemSchema.index({ name: "text", description: "text", location: "text" })

export default mongoose.models.FoundItem || mongoose.model("FoundItem", FoundItemSchema)

