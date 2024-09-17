import { Server } from '@hapi/hapi';
import { ItemController } from './controllers/itemController';

/**
 * Define las rutas del servidor.
 * Configura las rutas HTTP y sus correspondientes manejadores utilizando el controlador `ItemController`.
 *
 * @param server - Instancia del servidor Hapi en la que se definirán las rutas.
 */
export const defineRoutes = (server: Server) => {
  server.route([
    {
      method: 'GET',
      path: '/ping',
      handler: ItemController.ping, // Maneja la solicitud GET a '/ping' con el método 'ping' del controlador de items.
    },
    {
      method: 'GET',
      path: '/items',
      handler: ItemController.getItems, // Maneja la solicitud GET a '/items' con el método 'getItems' del controlador de items.
    },
    {
      method: 'GET',
      path: '/items/{id}',
      handler: ItemController.getItemById, // Maneja la solicitud GET a '/items/{id}' con el método 'getItemById' del controlador de items.
    },
    {
      method: 'POST',
      path: '/items',
      handler: ItemController.createItem, // Maneja la solicitud POST a '/items' con el método 'createItem' del controlador de items.
    },
    {
      method: 'PUT',
      path: '/items/{id}',
      handler: ItemController.updateItem, // Maneja la solicitud PUT a '/items/{id}' con el método 'updateItem' del controlador de items.
    },
    {
      method: 'DELETE',
      path: '/items/{id}',
      handler: ItemController.deleteItem, // Maneja la solicitud DELETE a '/items/{id}' con el método 'deleteItem' del controlador de items.
    },
  ]);
};
