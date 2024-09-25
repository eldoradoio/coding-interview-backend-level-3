import { Request, ResponseToolkit } from '@hapi/hapi';

export class HealthController {
    public init(server: any) {
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
   
    public async ping(request: Request, response: ResponseToolkit) {
        return {
            ok: true
        }
    }
}