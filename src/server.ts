import Hapi from "@hapi/hapi";
import { itemRoutes } from "./routes/item.routes";
import { connectToDatabase } from "./config/database";
import { ItemRepository } from "./repositories/item.repository";
import { ItemService } from "./services/item.service";
import { ItemController } from "./controllers/item.controller";
import mongoose from "mongoose";

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    databases: { dbA: mongoose.Connection; dbB: mongoose.Connection };
  }
}

export const initializeServer = async () => {
  const { dbA, dbB } = await connectToDatabase();

  const itemRepositoryA = new ItemRepository(dbA);
  const itemRepositoryB = new ItemRepository(dbB);
  const itemService = new ItemService(itemRepositoryA, itemRepositoryB);
  const itemController = new ItemController(itemService);

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  });

  server.app.databases = { dbA, dbB };

  itemRoutes(server, itemController);

  return server;
};

export const startServer = async () => {
  const server = await initializeServer();
  await server.start();
  console.log("Server running on %s", server.info.uri);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
