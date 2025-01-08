import { item } from '../../../models/item.ts';
import { ItemRepository } from './itemRepository.ts';

export class UpdateItemUseCase {
    
    itemRepository: ItemRepository;
    
    constructor() {
        this.itemRepository =  new ItemRepository(item);
    }
    // type item
    async execute(data: any) {
        const res =  await this.itemRepository.updateItem(data);
        return res;
    }
}