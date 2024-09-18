// conecciones a bases de datos A y B
import { AppDataSourceA, AppDataSourceB } from "../database/ormconfig";
// entidades
import { Item } from "../database/entities/Items";
// cliente redis
import redis from '../database/redis';



/**
 * Servicio para la gestión de ítems que se distribuyen entre dos bases de datos.
 * La distribución se basa en el valor de los IDs: 
 * - IDs pares se almacenan en la base de datos A.
 * - IDs impares se almacenan en la base de datos B.
 * 
 * @class ItemService
 */
export class ItemService {
  private itemRepositoryA = AppDataSourceA.getRepository(Item);
  private itemRepositoryB = AppDataSourceB.getRepository(Item);

  /**
   * Determina si el ID actual es par o impar y selecciona la base de datos adecuada.
   * Utiliza Redis para mantener un contador global de IDs.
   * 
   * @returns 'A' si el ID es par, 'B' si el ID es impar.
   */
  private async getTargetDatabase(): Promise<'A' | 'B'> {
    const currentId = await redis.incr('item_id_counter'); // Incrementa el contador en Redis
    return currentId % 2 === 0 ? 'A' : 'B';  // 'A' para pares, 'B' para impares
  }

  /**
 * Obtiene todos los ítems de ambas bases de datos.
 * 
 * @returns Una promesa que se resuelve con un arreglo que contiene todos los ítems de ambas bases de datos.
 */
async getAllItems(): Promise<Item[]> {
  const [itemsA, itemsB] = await Promise.all([
    this.itemRepositoryA.find(),
    this.itemRepositoryB.find()
  ]);
  return [...itemsA, ...itemsB];  // Combina los ítems de ambas bases de datos
}

  /**
   * Crea un nuevo ítem y lo almacena en la base de datos adecuada (A o B).
   * 
   * @param name - Nombre del ítem.
   * @param price - Precio del ítem.
   * @returns El ítem creado.
   * @throws Error si el precio es negativo.
   */
  async createItem(name: string, price: number): Promise<Item> {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    const targetDB = await this.getTargetDatabase(); // Determina si es A o B
    const repository = targetDB === 'A' ? this.itemRepositoryA : this.itemRepositoryB;

    const newItem = repository.create({ name, price });
    return await repository.save(newItem);
  }

  /**
   * Obtiene un ítem por su ID desde la base de datos adecuada.
   * 
   * @param id - ID del ítem.
   * @returns El ítem encontrado o null si no existe.
   */
  async getItemById(id: number): Promise<Item | null> {
    const repository = id % 2 === 0 ? this.itemRepositoryA : this.itemRepositoryB;
    return await repository.findOneBy({ id });
  }

  /**
   * Actualiza un ítem existente en la base de datos correspondiente.
   * 
   * @param id - ID del ítem.
   * @param name - Nuevo nombre del ítem.
   * @param price - Nuevo precio del ítem.
   * @returns El ítem actualizado o null si no existe.
   * @throws Error si el precio es negativo.
   */
  async updateItem(id: number, name: string, price: number): Promise<Item | null> {
    const repository = id % 2 === 0 ? this.itemRepositoryA : this.itemRepositoryB;
    const item = await repository.findOneBy({ id });
    
    if (!item) {
      return null;
    }

    if (price < 0) {
      throw new Error("Price cannot be negative");
    }

    item.name = name;
    item.price = price;

    return await repository.save(item);
  }

  /**
   * Elimina un ítem por su ID desde la base de datos correspondiente.
   * 
   * @param id - ID del ítem.
   */
  async deleteItem(id: number): Promise<void> {
    const repository = id % 2 === 0 ? this.itemRepositoryA : this.itemRepositoryB;
    await repository.delete(id);
  }
}
