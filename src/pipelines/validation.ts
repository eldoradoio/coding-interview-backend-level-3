import { ObjectSchema } from "joi";
import { Request, ResponseToolkit } from '@hapi/hapi';

/**
 * Middleware for validating request payloads against a Joi schema.
 * @param {ObjectSchema} schema - The Joi schema to validate against.
 * @returns {Function} A Hapi request lifecycle method for validation.
 */
export const validationPipe = (schema: ObjectSchema): Function => (request: Request, h: ResponseToolkit) => {
    const { error } = schema.validate(request.payload);
    if (error) {
        const errors = error.details.map((detail: any) => ({
            field: detail.context?.key,
            message: detail.message,
        }));

        return h.response({ errors }).code(400).takeover();
    }

    return h.continue;
}