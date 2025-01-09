import { IItemsRepository } from '../interfaces/IItemRepository';
import { IItems } from '../../../shared/interfaces/index.ts';

export class CreateItemUseCase {

    constructor(private itemRepository: IItemsRepository) {}

    async execute(data: IItems) {
        const res =  await this.itemRepository.createItem(data);
        return res;
    }
}