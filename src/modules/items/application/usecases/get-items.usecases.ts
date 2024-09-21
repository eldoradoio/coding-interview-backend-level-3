import { AppError } from "../../../../errors/app-error";
import { ErrorBussines } from "../../../../errors/constants.errors";
import { Item } from "../../dommain/item.entity";
import { ItemRepository } from "../../dommain/item.repository";

export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    try {
      const items = await this.itemRepository.findAll();
      return items;
    } catch (error) {
      throw new AppError(ErrorBussines.FAILED_TO_FETCH_ITEM, 500);
    }
  }
}
