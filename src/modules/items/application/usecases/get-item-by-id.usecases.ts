import { AppError } from "../../../../errors/app-error";
import { Item } from "../../dommain/item.entity";
import { ItemRepository } from "../../dommain/item.repository";

export class GetItemByIdUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(id: number): Promise<Item> {
        const existingItem = await this.itemRepository.findById(id);
        if (!existingItem) {
            throw new AppError('Item not found', 404);
        }
        return existingItem; 
    }
}