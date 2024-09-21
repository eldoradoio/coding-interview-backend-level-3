import { Request, ResponseToolkit } from "@hapi/hapi";
import { GetItemsUseCase } from "../../application/usecases/get-items.usecases";
import { TypeORMItemRepository } from "../db/typeorm-item.repository";
import { AppError } from "../../../../errors/app-error";
import { CreateItemUseCase } from "../../application/usecases/create-item.usecases";
import { UpdateItemUseCase } from "../../application/usecases/update-item.usecases";
import { DeleteItemUseCase } from "../../application/usecases/delete-item.usecases";
import { GetItemByIdUseCase } from "../../application/usecases/get-item-by-id.usecases";
import { handleError } from "../../../../errors/error-handler";
import { CreateItemDto } from "../../application/dtos/create-item.dto";
import { UpdateItemDto } from "../../application/dtos/update-item.dto";

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
      return handleError(error, request, h);
    }
  }
  async createItem(request: Request, h: ResponseToolkit) {
    try {
      const createItemDto: CreateItemDto = request.payload as {
        name: string;
        price: number;
      };
      const newItem = await createItemUseCase.execute(createItemDto);
      return h.response(newItem).code(201);
    } catch (error) {
      return handleError(error, request, h);
    }
  }

  async updateItem(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, request.params.price);
      const updateItemDto: CreateItemDto = request.payload as {
        name: string;
        price: number;
      };
      const updatedItem = await updateItemUseCase.execute(updateItemDto, id);
      return h.response(updatedItem).code(200);
    } catch (error) {
      return handleError(error, request, h);
    }
  }

  async deleteItem(request: Request, h: ResponseToolkit) {
    try {
      const itemId = parseInt(request.params.id, request.params.price);
      await deleteItemUseCase.execute(itemId);
      return h.response().code(204);
    } catch (error) {
      return handleError(error, request, h);
    }
  }

  async getItemById(request: Request, h: ResponseToolkit) {
    try {
      const itemId = parseInt(request.params.id);
      const searchItem = await getItemByIdUseCase.execute(itemId);
      return h.response(searchItem).code(200);
    } catch (error) {
      return handleError(error, request, h);
    }
  }
}
