import { Server } from "@hapi/hapi";
import { ItemController } from "../controllers/items.controller";

const itemController = new ItemController();

/**
 * Define todas las rutas del servidor.
 * @param {Server} server - El servidor de Hapi.
 */
export const itemRoutes = (server: Server) => {
  /**
   * Ruta de ping para comprobar el estado del servidor.
   * @method GET
   * @path /ping
   */
  server.route({
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return { ok: true };
    }
  });

  /**
   * Ruta para listar todos los ítems.
   * @method GET
   * @path /items
   */
  server.route({
    method: 'GET',
    path: '/items',
    handler: itemController.listItems
  });

  /**
   * Ruta para crear un nuevo ítem.
   * @method POST
   * @path /items
   */
  server.route({
    method: 'POST',
    path: '/items',
    handler: itemController.createItem
  });

  /**
   * Ruta para obtener un ítem por su ID.
   * @method GET
   * @path /items/{id}
   */
  server.route({
    method: 'GET',
    path: '/items/{id}',
    handler: itemController.getItemById
  });

  /**
   * Ruta para actualizar un ítem por su ID.
   * @method PUT
   * @path /items/{id}
   */
  server.route({
    method: 'PUT',
    path: '/items/{id}',
    handler: itemController.updateItem
  });

  /**
   * Ruta para eliminar un ítem por su ID.
   * @method DELETE
   * @path /items/{id}
   */
  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: itemController.deleteItem
  });
};
