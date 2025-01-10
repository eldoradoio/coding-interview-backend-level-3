import { IItemsRepository } from '../interfaces/IItemRepository';

export class DeleteItemUseCase {

    constructor(private itemRepository: IItemsRepository) {}
    
    async execute(data: number) {
        const res =  await this.itemRepository.deleteItem(data);
        return res;
    }
}