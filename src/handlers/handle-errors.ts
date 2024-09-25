import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const handleErrors = (handler: (request: Request, h: ResponseToolkit) => Promise<ResponseObject>) => {
    return async (request: Request, response: ResponseToolkit) => {
        try {
            return await handler(request, response);
        } catch (error: Error | any) {
            return response.response({ error: 'Internal Server Error' }).code(error.statusCode || 500);
        }
    };
};
