import { item } from '../../../models/item.ts';
import { ItemRepository } from './itemRepository.ts'
export class FindItemByIdUseCase {

    itemRepository;

    constructor(readonly model: typeof item) {
        this.itemRepository = new ItemRepository(model);
    }
    async execute() {
        const res = await this.itemRepository.findAll();
        return res
    }
}