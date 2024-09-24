import { Request, ResponseToolkit } from '@hapi/hapi';

export class HealthController {
    public init(server: any) {
        server.route({
            method: 'GET',
            path: '/ping',
            handler: this.ping.bind(this),
        });
    }
   
    public async ping(request: Request, response: ResponseToolkit) {
        return {
            ok: true
        }
    }
}