import { item } from '../../../models/item.ts';

export class ItemRepository {
    constructor(private itemModel: typeof item ) {
    }

    async findAll() {
        return this.itemModel.findAll();
    }

    async findItemById(data: number) {
        return await this.itemModel.findOne({ where: {
            id: data
        }});
    }

    // tipo item
    async createItem(data: any) {
        return await this.itemModel.create(data);
    }

    // tipo item
    async updateItem(data: any) {
        return  this.itemModel.update(data, { where: { id: data.id }});
    }

    async deleteItem(data: number) {
        return this.itemModel.destroy({ where: { id: data }});
    }
}