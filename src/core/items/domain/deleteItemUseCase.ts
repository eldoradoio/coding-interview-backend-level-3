import { item } from '../../../models/item.ts';
import { ItemRepository } from './itemRepository.ts';

export class DeleteItemUseCase {
    
    itemRepository: ItemRepository;
    
    constructor() {
        this.itemRepository =  new ItemRepository(item);
    }
    // type item
    async execute(data: number) {
        const res =  await this.itemRepository.deleteItem(data);
        return res;
    }
}