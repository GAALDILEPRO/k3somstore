// MongoDB Connection Management with Mongoose
// Production Connection Pooling optimized for Next.js App Router

import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL ||
  'mongodb://localhost:27017/k3somstore';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global cache to prevent multiple connections during Next.js Hot Module Reloading
const globalWithMongoose = globalThis as unknown as {
  mongoose: MongooseCache;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('🍃 Successfully connected to MongoDB for K3SOMSTORE');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.warn('⚠️ MongoDB connection attempt deferred (local offline fallback active):', (e as Error).message);
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
