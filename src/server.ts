import Hapi from "@hapi/hapi";
import { registerRoutes } from "./routes/index";
// Import de ambas fuentes de datos   
import { AppDataSourceA, AppDataSourceB } from "./database/ormconfig"; 
// impoer de redis e inicializacion
import "./database/redis";

export const getServer = async () => {
  const server = Hapi.server({
    host: "0.0.0.0",
    port: 3000,
  });

  // Registro de todas las rutas
  registerRoutes(server);
  
  // Inicializa DataSource A
  if (!AppDataSourceA.isInitialized) {
    try {
      await AppDataSourceA.initialize();
      console.log("Data Source A has been initialized!");
    } catch (error) {
      console.error("Error during Data Source A initialization:", error);
      process.exit(1);
    }
  }

  // Inicializa DataSource B
  if (!AppDataSourceB.isInitialized) {
    try {
      await AppDataSourceB.initialize();
      console.log("Data Source B has been initialized!");
    } catch (error) {
      console.error("Error during Data Source B initialization:", error);
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
