import { DatabaseARepository } from './DatabaseARepository';
import { DatabaseBRepository } from './DatabaseBRepository';
export class ItemManager {
    dbARepository = new DatabaseARepository();
    dbBRepository = new DatabaseBRepository();
    getRepository(id) {
        return id % 2 === 0 ? this.dbARepository : this.dbBRepository;
    }
    async getAllItems() {
        const [itemsA, itemsB] = await Promise.all([
            this.dbARepository.getAllItems(),
            this.dbBRepository.getAllItems()
        ]);
        return [...itemsA, ...itemsB];
    }
    async getItemById(id) {
        const repo = this.getRepository(id);
        const item = repo.getItem(id);
        return item;
    }
    async createItem(name, price) {
        const newItem = { id: Date.now(), name, price }; // Generate a unique ID
        const repo = this.getRepository(newItem.id);
        return repo.createItem(newItem);
    }
    async updateItem(id, name, price) {
        const repo = this.getRepository(id);
        return repo.updateItem(id, name, price);
    }
    async deleteItem(id) {
        const repo = this.getRepository(id);
        const del = repo.deleteItem(id);
        return del;
    }
}
