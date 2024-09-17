import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from '../services/itemService';
import Joi from 'joi';

export class ItemController {
  /**
   * Handler para la ruta '/ping'. Verifica que el servidor esté activo.
   * @param request - La solicitud HTTP.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns Un objeto con la propiedad `ok` en true.
   */
  static async ping(request: Request, h: ResponseToolkit) {
    return { ok: true };
  }

  /**
   * Obtiene todos los elementos disponibles.
   * @param request - La solicitud HTTP.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns Una lista de todos los elementos con código de respuesta 200.
   */
  static async getItems(request: Request, h: ResponseToolkit) {
    const items = await ItemService.getAllItems();
    return h.response(items).code(200);
  }

  /**
   * Obtiene un elemento por su ID.
   * @param request - La solicitud HTTP que contiene el parámetro `id`.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns El elemento encontrado con código 200, o un código 404 si no existe.
   */
  static async getItemById(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const item = await ItemService.getItemById(Number(id));
    if (item) {
      return h.response(item).code(200);
    }
    return h.response().code(404);
  }

  /**
   * Crea un nuevo elemento a partir de la información proporcionada en el cuerpo de la solicitud.
   * Valida los campos `name` y `price` antes de crear el elemento.
   * @param request - La solicitud HTTP que contiene el payload con los datos del nuevo elemento.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns El nuevo elemento creado con código 201, o errores de validación con código 400.
   */
  static async createItem(request: Request, h: ResponseToolkit) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
    });

    const { error, value } = schema.validate(request.payload, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message:
          detail.path[0] === 'price' && detail.type === 'number.positive'
            ? 'Field "price" cannot be negative'
            : `Field "${detail.path[0]}" is required`,
      }));
      return h.response({ errors }).code(400);
    }

    const { name, price } = value;
    const newItem = await ItemService.createItem(name, price);
    return h.response(newItem).code(201);
  }

  /**
   * Actualiza un elemento existente según el ID y los datos proporcionados.
   * Valida los campos `name` y `price` antes de actualizar el elemento.
   * @param request - La solicitud HTTP que contiene el parámetro `id` y el payload con los datos a actualizar.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns El elemento actualizado con código 200, o un código 404 si no existe.
   */
  static async updateItem(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
    });

    const { error, value } = schema.validate(request.payload, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message:
          detail.path[0] === 'price' && detail.type === 'number.positive'
            ? 'Field "price" cannot be negative'
            : `Field "${detail.path[0]}" is required`,
      }));
      return h.response({ errors }).code(400);
    }

    const { name, price } = value;
    const updatedItem = await ItemService.updateItem(Number(id), name, price);
    if (updatedItem) {
      return h.response(updatedItem).code(200);
    }
    return h.response().code(404);
  }

  /**
   * Elimina un elemento existente según su ID.
   * @param request - La solicitud HTTP que contiene el parámetro `id`.
   * @param h - El toolkit de respuesta para generar la respuesta HTTP.
   * @returns Un código 204 si la eliminación fue exitosa, o un código 404 si no existe el elemento.
   */
  static async deleteItem(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const success = await ItemService.deleteItem(Number(id));
    if (success) {
      return h.response().code(204);
    }
    return h.response().code(404);
  }
}
