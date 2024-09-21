import { AppDataSource } from "../../../../config/database/ormconfig";
import { Item } from "../../../../entities/item.entities";
import { ItemRepository } from "../../dommain/item.repository";

export class TypeORMItemRepository implements ItemRepository {
  private itemRepository = AppDataSource.getRepository(Item);

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: number): Promise<Item | null> {
    const item = await this.itemRepository.findOneBy({ id });
    return item ? item : null;
  }

  async save(item: Item): Promise<Item> {
    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
