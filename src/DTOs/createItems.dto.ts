const Joi = require('joi');

/**
 * DTO para la creación de un item
 * @class
 * @property {string} name - El nombre del ítem.
 * @property {number} price - El precio del ítem.
 * @method validate - Método para validar los datos de entrada.
 * @throws {ValidationError[]} - Lanza un error de validación si los datos de entrada no son válidos.
 * @example
 * const data = { name: 'Item 1', price: 10 };
 */
export class CreateItemDTO {
  
  static schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Field "name" is required',
    }),
    price: Joi.number().min(0).required().messages({
      'number.min': 'Field "price" cannot be negative',
      'number.base': 'Field "price" must be a number',
      'any.required': 'Field "price" is required',
    }),
  });

  name: string;
  price: number;

  constructor({ name, price }: { name: string; price: number }) {
    this.name = name;
    this.price = price;
  }

  static validate(data: any) {
    const { error, value } = this.schema.validate(data, { abortEarly: false });
    if (error) {
      // Mapeo de errores de validación
      const validationErrors = error.details.map((err: any) => ({
        field: err.context.key,
        message: err.message
      }));
      throw validationErrors; 
    }
    return value;
  }
}
