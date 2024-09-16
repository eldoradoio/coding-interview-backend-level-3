import { AppDataSource } from "../database/ormconfig";
import { Item } from "../database/entities/Items";



export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  // Lista todos los ítems de la base de datos
  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  /**
   * Crea un nuevo ítem.
   * @param name - Nombre del ítem.
   * @param price - Precio del ítem.
   * @returns El ítem creado.
   * @throws Error si el precio es negativo.
   */
  async createItem(name: string, price: number): Promise<Item> {
    
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    const newItem = this.itemRepository.create({ name, price });
    
    return await this.itemRepository.save(newItem);
  }

   // Obtiene un ítem por su ID
  async getItemById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id });
  }


   /**
   * Actualiza un ítem existente.
   * @param id - ID del ítem.
   * @param name - Nuevo nombre del ítem.
   * @param price - Nuevo precio del ítem.
   * @returns El ítem actualizado o null si no se encuentra.
   * @throws Error si el precio es negativo.
   */
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

  // Elimina un ítem por su ID
  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}