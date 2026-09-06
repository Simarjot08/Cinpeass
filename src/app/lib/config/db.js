import mongoose from "mongoose";


const MONGOoDB_URI = process.env.MONGODB_URI;

if (!MONGOoDB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}
export async function connectDB() {
  try {
   await mongoose.connect(MONGOoDB_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
