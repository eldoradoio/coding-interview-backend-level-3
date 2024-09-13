import { Item } from './ItemManager';

export class DatabaseBRepository {
  private items: Item[] = []; // Simular base de datos

  async getItem(id: number): Promise<Item | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async getAllItems(): Promise<Item[]> {
    //console.log('---> todos los items:', this.items);
    return this.items;
  }

  async createItem(item: Item): Promise<Item> {
    this.items.push(item);
    return item;
  }

  async updateItem(id: number, name: string, price: number): Promise<Item | null> {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return null;
    }
    this.items[itemIndex] = { id, name, price };
    return this.items[itemIndex];
  }

  async deleteItem(id: number): Promise<boolean> {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return false;
    }
    //const deletedItem = this.items.splice(itemIndex, 1)[0];
    //console.log('Elemento eliminado:', deletedItem);

    return true;
  }
}
