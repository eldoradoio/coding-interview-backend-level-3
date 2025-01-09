import Joi from "joi";

// Create Item Request Schema
export const createItemRequestSchema = Joi.object({
    id: Joi.number().optional().default(null),
    name: Joi.string()
        .required()
        .messages({
            'any.required': 'Field "price" is required',
        }),
    price: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.min': 'Field "price" cannot be negative',
            'any.required': 'Field "price" is required',
        }),
});
