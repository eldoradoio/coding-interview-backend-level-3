import { Server } from "@hapi/hapi"
import { RoutesItems } from './core/items/application/routes/index.ts';

export const defineRoutes = (server: Server) => {
    server.route([
        {
            method: 'GET',
            path: '/ping',
            handler: async (request, h) => {
                return {
                    ok: true
                }
            }
        },
        ...RoutesItems
    ]);  
}