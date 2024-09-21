import { AppError } from "../../../../errors/app-error";
import { ErrorBussines } from "../../../../errors/constants.errors";
import { Item } from "../../dommain/item.entity";
import { ItemRepository } from "../../dommain/item.repository";

export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(name: string, price: number): Promise<Item> {
    if (price < 0) {
      throw new AppError(ErrorBussines.PRICE_NEGATIVE, 400);
    }
    if (price === undefined || price === null) {
      throw new AppError(ErrorBussines.PRICE_REQUIRED, 400);
    }
    try {
      const newItem = new Item();
      newItem.name = name;
      newItem.price = price;

      return await this.itemRepository.save(newItem);
    } catch (error) {
      throw new AppError(ErrorBussines.FAILED_TO_CREATE_ITEM, 404);
    }
  }
}
