import { Request, ResponseToolkit, Server } from '@hapi/hapi';

export const requestLogger = (server: Server) => {
    server.ext('onRequest', (request: Request, h: ResponseToolkit) => {
        const date = new Date().toISOString();
        const method = request.method.toUpperCase();
        const path = request.path;
        const payload = JSON.stringify(request.payload) || '';
        const log = `${date} - ${method} ${path} ${payload ? " - Payload: " + payload : ''}`;
        console.log(`Request: ${log}`);
        
        return h.continue;
    });

    server.events.on('response', (request: Request) => {
        const date = new Date().toISOString();
        const method = request.method.toUpperCase();
        const path = request.path;
        const statusCode = request.response && 'statusCode' in request.response ? request.response.statusCode : 'unknown';
        const log = `${date} - ${method} ${path} - Status: ${statusCode}`;
        console.log(`Response: ${log}`);
    });
};