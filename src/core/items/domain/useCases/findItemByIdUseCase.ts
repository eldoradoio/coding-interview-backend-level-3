import { IItemsRepository } from '../interfaces/IItemRepository.ts'
import { HTTPCODES } from '../../../shared/constants/index.ts';

export class FindItemByIdUseCase {

    constructor(private itemRepository: IItemsRepository) {}

    async execute(data: number) {
        const res = await this.itemRepository.findItemById(data);

        if (!res) {
            throw {
                msg : "Item doesn´t exist",
                errorCode: HTTPCODES.notFoud,
                field: null
            }
        }
        return res
    }
}