import { MongoClient, type Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/syncoryx";

interface MongoClientCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

// Use a global variable to preserve the connection across hot reloads in development
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: MongoClientCache;
};

if (!globalWithMongo._mongoClientPromise) {
  globalWithMongo._mongoClientPromise = { client: null, promise: null };
}

const cached = globalWithMongo._mongoClientPromise;

export async function getMongoClient(): Promise<MongoClient> {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    // Fail fast so pages fall back to default copy instead of hanging
    // when the database is unreachable.
    cached.promise = MongoClient.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error) {
    // Let the next request retry instead of reusing a rejected promise.
    cached.promise = null;
    throw error;
  }
  return cached.client;
}

export async function getDb(dbName = "syncoryx"): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
