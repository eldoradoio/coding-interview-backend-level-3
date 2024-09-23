import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { initializeServer } from "../src/server";
import { Server } from "@hapi/hapi";

let mongoA: MongoMemoryServer;
let mongoB: MongoMemoryServer;
let server: Server;

beforeAll(async () => {
  mongoA = await MongoMemoryServer.create();
  mongoB = await MongoMemoryServer.create();
  
  const uriA = mongoA.getUri();
  const uriB = mongoB.getUri();

  process.env.MONGO_URI_A = uriA;
  process.env.MONGO_URI_B = uriB;

  server = await initializeServer();
  await server.initialize();
});

beforeEach(async () => {
  jest.clearAllMocks();
  const { dbA, dbB } = server.app.databases;
  await Promise.all([
    dbA.dropDatabase(),
    dbB.dropDatabase()
  ]);
});

afterAll(async () => {
  if (server) {
    await server.stop();
  }
  await Promise.all([
    mongoA.stop(),
    mongoB.stop()
  ]);
  await mongoose.disconnect();
});

export { server };
