import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

/**
 * A higher-order function to handle errors in request handlers.
 * @param {Function} handler - The request handler function to wrap.
 * @returns {Function} A new request handler function with error handling.
 */
export const handleErrors = (handler: (request: Request, h: ResponseToolkit) => Promise<ResponseObject>): Function => {
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
