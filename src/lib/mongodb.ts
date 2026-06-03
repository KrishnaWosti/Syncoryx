import { MongoClient, type Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/syncoryx";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

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
    cached.promise = MongoClient.connect(MONGODB_URI);
  }

  cached.client = await cached.promise;
  return cached.client;
}

export async function getDb(dbName = "syncoryx"): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
