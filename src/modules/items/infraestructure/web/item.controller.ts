import { Request, ResponseToolkit } from "@hapi/hapi";
import { GetItemsUseCase } from "../../application/usecases/get-items.usecases";
import { TypeORMItemRepository } from "../db/typeorm-item.repository";
import { AppError } from "../../../../errors/app-error";
import { CreateItemUseCase } from "../../application/usecases/create-item.usecases";

const itemRepository = new TypeORMItemRepository();
const getItemsUseCase = new GetItemsUseCase(itemRepository);
const createItemUseCase = new CreateItemUseCase(itemRepository);

export class ItemController {
  async getItems(request: Request, h: ResponseToolkit) {
    try {
      const items = await getItemsUseCase.execute();
      return h.response(items).code(200);
    } catch (error) {
      throw new AppError("Failed to get items", 500);
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
      console.log(error);
    }
  }
}
