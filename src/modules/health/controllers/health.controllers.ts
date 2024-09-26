import { Request, ResponseToolkit, Server } from '@hapi/hapi';

export class HealthController {
    
    /**
    * Initializes the health controller by setting up routes.
    * @param {Server} server - The Hapi server instance.
    */
    public init(server: Server) {
        server.route({
            method: 'GET',
            path: '/ping',
            options: {
                handler: this.ping.bind(this),
                description: 'Ping',
                notes: 'Returns a pong response',
                tags: ['api', 'health'],
            }
        });
    }

    /**
     * Handles the ping request to check the health of the service.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<{ ok: boolean }>} The response object indicating the health status.
     */
    public async ping(request: Request, response: ResponseToolkit): Promise<{ ok: boolean; }> {
        return {
            ok: true
        }
    }
}