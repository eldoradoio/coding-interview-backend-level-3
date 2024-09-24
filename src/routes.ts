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
    itemController.init(server);
}