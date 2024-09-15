import { AppDataSource } from "../database/ormconfig";
import { Item } from "../database/entities/Items";

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async createItem(name: string, price: number): Promise<Item> {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    const newItem = this.itemRepository.create({ name, price });
    return await this.itemRepository.save(newItem);
  }

  async getItemById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id });
  }

  async updateItem(id: number, name: string, price: number): Promise<Item | null> {
    const item = await this.getItemById(id);
    if (!item) {
      return null;
    }
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    item.name = name;
    item.price = price;
    return await this.itemRepository.save(item);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}