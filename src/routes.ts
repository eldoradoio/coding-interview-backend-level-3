import { Server } from "@hapi/hapi";
import { ItemController } from "./controllers/items.controller";

const itemController = new ItemController();

export const defineRoutes = (server: Server) => {
  // Ruta para el ping
  server.route({
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return { ok: true };
    }
  });

  server.route({
    method: 'GET',
    path: '/items',
    handler: itemController.listItems
  });
  
  server.route({
    method: 'POST',
    path: '/items',
    handler: itemController.createItem
  });
  
  server.route({
    method: 'GET',
    path: '/items/{id}',
    handler: itemController.getItemById
  });
  
  server.route({
    method: 'PUT',
    path: '/items/{id}',
    handler: itemController.updateItem
  });
  
  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: itemController.deleteItem
  });
};
