import Joi from "joi";

/**
 * Schema for validating item creation requests.
 * @type {Joi.ObjectSchema}
 * @property {string} name - The name of the item. It is required.
 * @property {number} price - The price of the item. It must be greater than 0 and is required.
 */
export const itemCreationSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().greater(0).required().messages({
        'number.greater': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});

/**
 * Schema for validating item update requests.
 * @type {Joi.ObjectSchema}
 * @property {string} name - The name of the item. It is required.
 * @property {number} price - The price of the item. It must be greater than 0 and is required.
 */
export const itemUpdateSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().greater(0).required().messages({
        'number.greater': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});