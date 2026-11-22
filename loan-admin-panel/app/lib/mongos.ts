
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("[MONGODB] Starting connection...");

    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "loanAdminDB",
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("[MONGODB] Connected successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;

    console.error(
      "[MONGODB] Connection failed:",
      error instanceof Error ? error.message : error
    );

    throw error;
  }
}
