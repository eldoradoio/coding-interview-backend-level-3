import Hapi from "@hapi/hapi";
import { defineRoutes } from "./routes";
import { connectToDatabases } from "./db";

const getServer = () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  defineRoutes(server);

  return server;
};

export const initializeServer = async () => {
  await connectToDatabases();
  const server = getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  await connectToDatabases();
  const server = getServer();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
