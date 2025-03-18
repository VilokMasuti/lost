import mongoose from "mongoose";
import 'dotenv/config'; // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default dbConnect;
