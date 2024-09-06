import Hapi from "@hapi/hapi";
import { connectDatabase } from "./config/database";
import { itemRoutes } from "./routes/item.routes";

export const initializeServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  await connectDatabase();

  server.route({
    method: "GET",
    path: "/ping",
    handler: (request, h) => {
      return h.response({ ok: true }).code(200);
    },
  });

  itemRoutes(server);

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
