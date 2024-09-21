import { AppError } from "../../../../errors/app-error";
import { ItemRepository } from "../../dommain/item.repository";


export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}
  
  async execute(id: number): Promise<void> {
    const existingItem = await this.itemRepository.findById(id);
    if (!existingItem) {
      throw new AppError('Item not found', 404);
    }
    await this.itemRepository.delete(id);
  }
}
