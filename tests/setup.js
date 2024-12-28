// setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 75000,
  connectTimeoutMS: 60000,
  operationTimeoutMS: 30000
};

module.exports = {
  connect: async () => {
    try {
      if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create();
        const uri = await mongoServer.getUri();
        await mongoose.connect(uri, opts);
        console.log('Connected to test database');
      }
      return mongoose.connection;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  },

  disconnect: async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
      if (mongoServer) {
        await mongoServer.stop();
        mongoServer = null;
      }
      console.log('Disconnected from test database');
    } catch (error) {
      console.error('Database disconnection error:', error);
      throw error;
    }
  },

  clearDatabase: async () => {
    if (mongoose.connection.readyState !== 1) {
      return; // Don't try to clear if not connected
    }
    try {
      const collections = mongoose.connection.collections;
      const clearPromises = Object.values(collections).map(collection =>
        collection.deleteMany({}).catch(err => {
          console.warn(`Failed to clear collection ${collection.collectionName}:`, err);
        })
      );
      await Promise.all(clearPromises);
      console.log('Database cleared');
    } catch (error) {
      console.warn('Clear database warning:', error);
      // Don't throw error to prevent test interruption
    }
  }
};

// Test setup function to be used in test files
module.exports.setupTestDB = () => {
  // Increase timeout for setup
  jest.setTimeout(120000);

  let server = null;

  beforeAll(async () => {
    await module.exports.connect();
  });

  beforeEach(async () => {
    await module.exports.clearDatabase();
  });

  afterEach(async () => {
    await module.exports.clearDatabase();
  });

  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
    await module.exports.disconnect();
  });

  return {
    getServer: () => server,
    setServer: (s) => { server = s; }
  };
};