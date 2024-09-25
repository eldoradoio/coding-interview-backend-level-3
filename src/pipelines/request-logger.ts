import { Request, ResponseToolkit } from '@hapi/hapi';

export const requestLogger = (request: Request, response: ResponseToolkit) => {
    const date = new Date().toISOString();
    const method = request.method.toUpperCase();
    const path = request.path;
    const payload = JSON.stringify(request.payload);
    const log = `${date} - ${method} ${path} - Payload: ${payload ? payload : 'No payload'}`;
    console.log(log);
    
    return response.continue;
};