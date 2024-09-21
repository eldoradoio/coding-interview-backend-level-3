import { AppError } from "../../../../errors/app-error";
import { ErrorBussines } from "../../../../errors/constants.errors";
import { Item } from "../../dommain/item.entity";
import { ItemRepository } from "../../dommain/item.repository";


export class UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: number, name: string, price: number): Promise<Item> {
    if (price < 0) {
      throw new AppError(ErrorBussines.PRICE_NEGATIVE, 400);
    }
    if (price === undefined || price === null) {
        throw new AppError(ErrorBussines.PRICE_REQUIRED, 400);
    }

    const existingItem = await this.itemRepository.findById(id);
    if (!existingItem) {
      throw new AppError(ErrorBussines.ITEM_NOT_FOUND, 404);
    }

    existingItem.name = name;
    existingItem.price = price;
    return await this.itemRepository.save(existingItem);
  }
}
