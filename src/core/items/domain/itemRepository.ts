import { item } from '../../../models/item.ts';

export class ItemRepository {
    constructor(private itemModel: typeof item ) {
    }

    async findAll() {
        return this.itemModel.findAll();
    }
}