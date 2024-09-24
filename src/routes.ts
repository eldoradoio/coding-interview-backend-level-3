import { Server } from "@hapi/hapi"
import { ItemController } from "./controllers"

export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    });

    const itemController = new ItemController();

    server.route([
        {
            method: 'GET',
            path: '/items',
            handler: itemController.list.bind(itemController)
        },
        {
            method: 'GET',
            path: '/items/{id}',
            handler: itemController.get.bind(itemController)
        },
        {
            method: 'POST',
            path: '/items',
            handler: itemController.create.bind(itemController)
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            handler: itemController.update.bind(itemController)
        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            handler: itemController.delete.bind(itemController)
        }
    ]);
}