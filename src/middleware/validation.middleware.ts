import Joi from "joi";
import { Request, ResponseToolkit } from "@hapi/hapi";

const itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().positive(),
}).messages({
  "any.required": `Field "{#label}" is required`,
  "number.positive": `Field "{#label}" cannot be negative`,
  "number.base": `Field "{#label}" must be a number`,
});

export const validateItem = (request: Request, h: ResponseToolkit) => {
  console.log("01");
  const { error } = itemSchema.validate(request.payload, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.context?.key || "",
      message: detail.message.replace(/""/g, '"'),
    }));
    return h.response({ errors }).code(400).takeover();
  }
  console.log("02");
  return h.continue;
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": `"page" debe ser un número`,
    "number.min": `"page" debe ser mayor o igual a 1`,
  }),
  limit: Joi.number().integer().min(1).max(25).default(10).messages({
    "number.base": `"limit" debe ser un número`,
    "number.min": `"limit" debe ser mayor o igual a 1`,
    "number.max": `"limit" no puede ser mayor que 25`,
  }),
  sort: Joi.string().valid("id", "name", "price").default("id").messages({
    "any.only": `"sort" debe ser uno de los siguientes valores: id, name, price`,
  }),
  order: Joi.string().valid("asc", "desc").default("asc").messages({
    "any.only": `"order" debe ser "asc" o "desc"`,
  }),
});

export const validateQueryParams = {
  method: (request: Request, h: ResponseToolkit) => {
    const { value, error } = querySchema.validate(request.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.context?.key || "",
        message: detail.message.replace(/""/g, '"'),
      }));
      return h.response({ errors }).code(400).takeover();
    }

    return value;
  },
  assign: "validatedQuery",
};
