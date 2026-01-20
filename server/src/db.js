import { MongoClient, ServerApiVersion } from 'mongodb';

let client;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'capstonProject';

  if (!uri) {
    throw new Error('Missing MONGODB_URI in server/.env');
  }

  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    await client.connect();
  }

  return client.db(dbName);
}

