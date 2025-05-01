import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import configs from './configs.js';


const uri = configs.MONGODB_URI;
const dbName = configs.DB_NAME;
console.log(uri, dbName);

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}