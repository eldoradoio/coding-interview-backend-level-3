import { IItemsRepository } from '../interfaces/IItemRepository.ts';
import { IItems } from '../../../shared/interfaces/index.ts';
import { FindItemByIdUseCase } from './findItemByIdUseCase.ts';

export class UpdateItemUseCase {

    findItemByIdUseCase: FindItemByIdUseCase;

    constructor(private itemRepository: IItemsRepository) {
        this.findItemByIdUseCase = new FindItemByIdUseCase(itemRepository);
    }

    async execute(data: IItems) {
        await this.itemRepository.updateItem(data);
        const itemUpdated = await this.findItemByIdUseCase.execute(data.id);
        return itemUpdated;
    }
}