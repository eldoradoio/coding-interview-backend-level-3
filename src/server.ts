import Hapi from "@hapi/hapi";
import { defineRoutes } from "./routes";
import { AppDataSource } from "./database/ormconfig";

export const getServer = async () => {
  const server = Hapi.server({
    host: "0.0.0.0",
    port: 3000,
  });

  defineRoutes(server);

  // Verifica si ya está inicializada la base de datos
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (error) {
      console.error("Error during Data Source initialization:", error);
      process.exit(1);
    }
  }

  return server;
};

export const startServer = async () => {
  const server = await getServer();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

export const initializeServer = async () => {
  const server = await getServer();
  await server.initialize();
  return server;
};
