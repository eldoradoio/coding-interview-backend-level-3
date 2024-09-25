import Joi from "joi";

export const itemCreationSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().greater(0).required().messages({
        'number.greater': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});

export const itemUpdateSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().greater(0).required().messages({
        'number.greater': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});