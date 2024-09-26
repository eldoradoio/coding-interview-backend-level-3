import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const handleErrors = (handler: (request: Request, h: ResponseToolkit) => Promise<ResponseObject>) => {
    return async (request: Request, response: ResponseToolkit) => {
        try {
            return await handler(request, response);
        } catch (error: Error | any) {
            const message = error.message || 'Internal Server Error';
            const code = error.statusCode || 500;
            return response.response({ error: message }).code(code);
        }
    };
};
