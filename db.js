const { MongoClient } = require('mongodb');

let _db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
    _db = client.db('portfolio');

    // create new collection if it does not exist
    const collectionName = 'users';
    const collections = await _db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collectionName);

    if (!collectionExists) {
      await _db.createCollection(collectionName);
      console.log(`Created new collection: ${collectionName}`);
    }

    console.log('Connected to MongoDB database');
    // console.log(_db);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }

  return _db;
}
function getDb() {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
}

module.exports = {
  connectToDatabase,
  getDb,
};
