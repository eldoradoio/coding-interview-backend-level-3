import { AppError } from "../../../../errors/app-error";
import { Item } from "../../dommain/item.entity";
import { ItemRepository } from "../../dommain/item.repository";

export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    try {
      const items = await this.itemRepository.findAll();
      return items;
    } catch (error) {
      throw new AppError("Failed to fetch items", 500);
    }
  }
}
