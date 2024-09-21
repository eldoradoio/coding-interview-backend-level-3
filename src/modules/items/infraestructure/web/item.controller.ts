import { Request, ResponseToolkit } from "@hapi/hapi";
import { GetItemsUseCase } from "../../application/usecases/get-items.usecases";
import { TypeORMItemRepository } from "../db/typeorm-item.repository";
import { AppError } from "../../../../errors/app-error";
import { CreateItemUseCase } from "../../application/usecases/create-item.usecases";
import { UpdateItemUseCase } from "../../application/usecases/update-item.usecases";
import { DeleteItemUseCase } from "../../application/usecases/delete-item.usecases";
import { GetItemByIdUseCase } from "../../application/usecases/get-item-by-id.usecases";

const itemRepository = new TypeORMItemRepository();
const getItemsUseCase = new GetItemsUseCase(itemRepository);
const createItemUseCase = new CreateItemUseCase(itemRepository);
const updateItemUseCase = new UpdateItemUseCase(itemRepository);
const deleteItemUseCase = new DeleteItemUseCase(itemRepository);
const getItemByIdUseCase = new GetItemByIdUseCase(itemRepository);

export class ItemController {
  async getItems(request: Request, h: ResponseToolkit) {
    try {
      const items = await getItemsUseCase.execute();
      return h.response(items).code(200);
    } catch (error) {
      throw new AppError("Failed to get items", 404);
    }
  }
  async createItem(request: Request, h: ResponseToolkit) {
    try {
      const { name, price } = request.payload as {
        name: string;
        price: number;
      };
      const newItem = await createItemUseCase.execute(name, price);
      return h.response(newItem).code(201);
    } catch (error) {
      if (error instanceof AppError) {
        return h
          .response({
            errors: [
              {
                field: "price",
                message: error.message,
              },
            ],
          })
          .code(error.statusCode);
      }
      return h.response({ message: "Internal Server Error" }).code(500);
    }
  }

  async updateItem(request: Request, h: ResponseToolkit) {
    try {
      const { name, price } = request.payload as {
        name: string;
        price: number;
      };
      const itemId = parseInt(request.params.id, 10);
      const updatedItem = await updateItemUseCase.execute(itemId, name, price);
      return h.response(updatedItem).code(200);
    } catch (error) {
      if (error instanceof AppError) {
        if (error.message === 'Field "price" cannot be negative') {
          return h
            .response({
              errors: [
                {
                  field: "price",
                  message: error.message,
                },
              ],
            })
            .code(error.statusCode);
        }
      }
      return h.response({ message: "Internal Server Error" }).code(500);
    }
  }

  async deleteItem(request: Request, h: ResponseToolkit) {
    try {
      const itemId = parseInt(request.params.id, 10);
      await deleteItemUseCase.execute(itemId);
      return h.response().code(204);
    } catch (error) {
      throw new AppError("Failed to get items", 400);
    }
  }

  async getItemById(request: Request, h: ResponseToolkit) {
    try {
      const itemId = parseInt(request.params.id, 10);
      const searchItem = await getItemByIdUseCase.execute(itemId);
      return h.response(searchItem).code(200);
    } catch (error) {
      if (error instanceof AppError) {
        return h.response({ message: error.message }).code(error.statusCode);
      }
      return h.response({ message: "Internal Server Error" }).code(500);
    }
  }
}
