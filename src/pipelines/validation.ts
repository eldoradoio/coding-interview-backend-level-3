import { ObjectSchema } from "joi";
import { Request, ResponseToolkit } from '@hapi/hapi';

export const validationPipe = (schema: ObjectSchema) => (request: Request, h: ResponseToolkit) => {
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