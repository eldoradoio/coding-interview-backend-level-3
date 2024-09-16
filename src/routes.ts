import { Server } from "@hapi/hapi";
import { getAllItems, getItem, ItemDocument, saveItem } from "./db";

export const defineRoutes = (server: Server) => {
  server.route({
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return {
        ok: true,
      };
    },
  });

  server.route({
    method: "GET",
    path: "/items",
    handler: async (request, h) => {
      const items = await getAllItems();
      return h.response(items).code(200);
    },
  });

  server.route({
    method: "GET",
    path: "/items/{id}",
    handler: async (request, h) => {
      const id = parseInt(request.params.id);
      const item = await getItem(id);
      if (!item) {
        return h.response({ message: "Item not found" }).code(404);
      }
      console.log("01 Item found", item);
      return h.response(item).code(200);
    },
  });

  server.route({
    method: "POST",
    path: "/items",
    handler: async (request, h) => {
      const item = request.payload as ItemDocument;
      await saveItem(item);
      return h.response({ message: "Item saved successfully", item }).code(201);
    },
  });
};
