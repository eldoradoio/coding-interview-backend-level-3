import { AppError } from "../../../../errors/app-error";
import { ErrorBussines } from "../../../../errors/constants.errors";
import { ItemRepository } from "../../dommain/item.repository";


export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}
  
  async execute(id: number): Promise<void> {
    const existingItem = await this.itemRepository.findById(id);
    if (!existingItem) {
      throw new AppError(ErrorBussines.ITEM_NOT_FOUND, 404);
    }
    await this.itemRepository.delete(id);
  }
}
