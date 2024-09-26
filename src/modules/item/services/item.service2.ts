import { ItemDTO } from '../dtos';
import { ItemNotFoundError } from '../errors';

export class ItemServiceMemory {
    private items: ItemDTO[] = [];
    private currentId: number = 1;

    async list() {
        return this.items;
    }

    async get(id: number) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new ItemNotFoundError();
        }
        
        return item;
    }

    async create(name: string, price: number) {
        const newItem: ItemDTO = {
            id: this.currentId++,
            name,
            price,
        };
        this.items.push(newItem);
        
        return newItem;
    }

    async update(id: number, name: string, price: number) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            throw new ItemNotFoundError();
        }
        this.items[itemIndex] = { id, name, price };
        
        return this.items[itemIndex];
    }

    async delete(id: number) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            throw new ItemNotFoundError();
        }
        const deletedItem = this.items.splice(itemIndex, 1);
        
        return deletedItem[0];
    }
}