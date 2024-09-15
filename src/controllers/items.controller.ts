import { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemService } from "../service/items.services";

const itemService = new ItemService();

export class ItemController {
  // Listar todos los ítems
  async listItems(request: Request, h: ResponseToolkit) {
    const items = await itemService.getAllItems();
    return h.response(items).code(200);
  }

  // Crear un nuevo ítem
  async createItem(request: Request, h: ResponseToolkit) {
    const { name, price } = request.payload as { name: string; price: any };  // Asegurarse de que price se maneja como "any"

    if (!name || price === undefined) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" is required' }]
      }).code(400);
    }

    // Asegúrate de que el precio es numérico
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" must be a number' }]
      }).code(400);
    }

    if (numericPrice < 0) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" cannot be negative' }]
      }).code(400);
    }

    const newItem = await itemService.createItem(name, numericPrice);
    return h.response(newItem).code(201);
  }

  // Obtener un ítem por ID
  async getItemById(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const item = await itemService.getItemById(Number(id));

    if (!item) {
      return h.response({ message: "Item not found" }).code(404);
    }

    return h.response(item).code(200);
  }

  // Actualizar un ítem
  async updateItem(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const { name, price } = request.payload as { name: string; price: any };

    if (!name || price === undefined) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" is required' }]
      }).code(400);
    }

    // Asegúrate de que el precio es numérico
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" must be a number' }]
      }).code(400);
    }

    if (numericPrice < 0) {
      return h.response({
        errors: [{ field: "price", message: 'Field "price" cannot be negative' }]
      }).code(400);
    }

    const updatedItem = await itemService.updateItem(Number(id), name, numericPrice);

    if (!updatedItem) {
      return h.response({ message: "Item not found" }).code(404);
    }

    return h.response(updatedItem).code(200);
  }

  // Eliminar un ítem
  async deleteItem(request: Request, h: ResponseToolkit) {
    const { id } = request.params;

    const item = await itemService.getItemById(Number(id));

    if (!item) {
      return h.response({ message: "Item not found" }).code(404);
    }

    await itemService.deleteItem(Number(id));
    return h.response().code(204); // Respuesta 204 sin contenido
  }
}