import { AppDataSource } from "../database/ormconfig";
import { Item } from "../database/entities/Items";


/**
 * Servicio para la gestión de ítems.
 * @class
 * @method getAllItems - Método para listar todos los ítems.
 * @method createItem - Método para crear un ítem.
 * @method getItemById - Método para obtener un ítem por su ID.
 * @method updateItem - Método para actualizar un ítem.
 * @method deleteItem - Método para eliminar un ítem.
 * 
 */
export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  /**
   * motodo que lista todos los ítems de la db.
   * @returns {Promise<Item[]>} - Una promesa que resuelve en un arreglo de ítems.
   */
  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  /**
   * Método para crear un ítem.
   * @param {string} name - El nombre del ítem.
   * @param {number} price - El precio del ítem.
   * @returns {Promise<Item>} - Una promesa que resuelve en el ítem creado.
   * @throws {Error} - Lanza un error si el precio es negativo.
   */
  async createItem(name: string, price: number): Promise<Item> {
    
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    const newItem = this.itemRepository.create({ name, price });
    
    return await this.itemRepository.save(newItem);
  }

  /**
   * Método para obtener un ítem por su ID.
   * @param {number} id - El ID del ítem.
   * @returns {Promise<Item | null>} - Una promesa que resuelve en el ítem encontrado o nulo si no se encuentra el ítem.
   */
  async getItemById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id });
  }


  /**
    * Método para actualizar un ítem.
    * @param {number} id - El ID del ítem.
    * @param {string} name - El nombre del ítem.
    * @param {number} price - El precio del ítem.
    * @returns {Promise<Item | null>} - Una promesa que resuelve en el ítem actualizado o nulo si no se encuentra el ítem.
    * @throws {Error} - Lanza un error si el precio es negativo.
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

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}