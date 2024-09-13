import { DatabaseARepository } from './DatabaseARepository';
import { DatabaseBRepository } from './DatabaseBRepository';

export interface Item {
  id: number;
  name: string;
  price: number;
}

export class ItemManager {
    private dbARepository: DatabaseARepository = new DatabaseARepository();
    private dbBRepository: DatabaseBRepository = new DatabaseBRepository();
  
    private getRepository(id: number) {
        return id % 2 === 0 ? this.dbARepository : this.dbBRepository;
    }
    
    async getAllItems(): Promise<Item[]> {
        const [itemsA, itemsB] = await Promise.all([
          this.dbARepository.getAllItems(),
          this.dbBRepository.getAllItems()
        ]);
        return [...itemsA, ...itemsB];
    }    
  
    async getItemById(id: number): Promise<Item | null> {
        const repo = this.getRepository(id);
        const item = repo.getItem(id);
        return item;
    }

    async createItem(name: string, price: number): Promise<Item> {
        const newItem = { id: Date.now(), name, price }; // Generate a unique ID
        const repo = this.getRepository(newItem.id);
        return repo.createItem(newItem);
    }

    async updateItem(id: number, name: string, price: number): Promise<Item | null> {
        const repo = this.getRepository(id);
        return repo.updateItem(id, name, price);
    }

    async deleteItem(id: number): Promise<boolean> {
        const repo = this.getRepository(id);
        const del = repo.deleteItem(id);
        return del;
    }
}