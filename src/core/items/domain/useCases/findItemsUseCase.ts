import { IItemsRepository } from '../interfaces/IItemRepository.ts'

export class FindItemsUseCase {

    constructor(private itemRepository: IItemsRepository) {}
    
    async execute() {
        const res = await this.itemRepository.findAll();
        return res
    }
}