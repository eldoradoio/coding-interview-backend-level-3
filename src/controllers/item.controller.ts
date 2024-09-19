import { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemService } from "../services/item.service";

export class ItemController {
  constructor(private itemService: ItemService) {}
  async getAllItems(request: Request, h: ResponseToolkit) {
    const items = await this.itemService.getAllItems();
    return h.response(items).code(200);
  }

  async getItemById(request: Request, h: ResponseToolkit) {
    const { id } = request.params;
    const item = await this.itemService.getItemById(id);
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

      const items = await this.itemService.getItemsPaginated(
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
    console.log("03");
    const { name, price } = request.payload as any;
    console.log("04", name, price);
    const newItem = await this.itemService.createItem(name, price);
    console.log("05", newItem);
    return h.response(newItem).code(201);
  }

  async updateItem(request: Request, h: ResponseToolkit) {
    const id = parseInt(request.params.id);
    const { name, price } = request.payload as any;
    const updatedItem = await this.itemService.updateItem(id, name, price);
    if (!updatedItem) {
      return h.response().code(404);
    }
    return h.response(updatedItem).code(200);
  }

  async deleteItem(request: Request, h: ResponseToolkit) {
    const id = parseInt(request.params.id);
    const deleted = await this.itemService.deleteItem(id);
    if (!deleted) {
      return h.response().code(404);
    }
    return h.response().code(204);
  }
}
