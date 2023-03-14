import { MongoClient, Db } from 'mongodb';

let _db: Db;

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  _db = client.db('user-registration');
  return _db;
}

export function getDb(): Db {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
}
