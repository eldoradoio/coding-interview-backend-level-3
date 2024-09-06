import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { initializeServer } from "../src/server";
import { Server } from "@hapi/hapi";

let mongo: MongoMemoryServer | undefined;
let server: Server;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
  }
  server = await initializeServer();
  await server.initialize();
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db?.collections();
  if (!collections) return;
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterEach(async () => {
  await server.stop();
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
