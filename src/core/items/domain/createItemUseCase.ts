import { item } from '../../../models/item.ts';
import { ItemRepository } from './itemRepository.ts';

export class CreateItemUseCase {
    
    itemRepository: ItemRepository;
    
    constructor() {
        this.itemRepository =  new ItemRepository(item);
    }
    // type item
    async execute(data: any) {
        const res =  await this.itemRepository.createItem(data);
        return res;
    }
}