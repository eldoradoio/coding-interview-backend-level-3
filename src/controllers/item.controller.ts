import { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemService } from "../services/item.service";

const itemService = new ItemService();

export class ItemController {
  async getAllItems(request: Request, h: ResponseToolkit) {
    const items = await itemService.getAllItems();
    return h.response(items).code(200);
  }

  async getItemById(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const item = await itemService.getItemById(id);
    if (!item) {
      return h.response().code(404);
    }
    return h.response(item).code(200);
  }

  async getItemsPaginated(request: Request, h: ResponseToolkit) {
    try {
      const { page, limit, sort, order } = request.pre.validatedQuery as {
        page: number;
        limit: number;
        sort: string;
        order: "asc" | "desc";
      };

      const items = await itemService.getItemsPaginated(
        page,
        limit,
        sort,
        order
      );
      return h.response(items).code(200);
    } catch (error) {
      console.error("Error in getItemsPaginated:", error);
      return h.response({ message: "Internal Server Error" }).code(500);
    }
  }

  async createItem(request: Request, h: ResponseToolkit) {
    const { name, price } = request.payload as any;
    const newItem = await itemService.createItem(name, price);
    return h.response(newItem).code(201);
  }

  async updateItem(request: Request, h: ResponseToolkit) {
    const id = parseInt(request.params.id);
    const { name, price } = request.payload as any;
    const updatedItem = await itemService.updateItem(id, name, price);
    if (!updatedItem) {
      return h.response().code(404);
    }
    return h.response(updatedItem).code(200);
  }

  async deleteItem(request: Request, h: ResponseToolkit) {
    const id = parseInt(request.params.id);
    const deleted = await itemService.deleteItem(id);
    if (!deleted) {
      return h.response().code(404);
    }
    return h.response().code(204);
  }
}
