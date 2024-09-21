type Item = {
  id: number;
  name: string;
  price: number;
};

// Simulacion entre dos database separadas
let itemsServerA: Item[] = []; // Even IDs
let itemsServerB: Item[] = []; // Odd IDs
let currentId = 1;

export class ItemService {
  /**
   * Retorna todos los elementos almacenados en ambos servidores.
   * @returns Una lista de todos los elementos.
   */
  static async getAllItems() {
    return [...itemsServerA, ...itemsServerB].sort((a, b) => a.id - b.id);
  }

  /**
   * Busca y retorna un elemento por su ID desde el servidor apropiado.
   * @param id - El ID del elemento que se busca.
   * @returns El elemento si se encuentra, o `null` si no existe.
   */
  static async getItemById(id: number) {
    const server = id % 2 === 0 ? itemsServerA : itemsServerB;
    return server.find((item) => item.id === id) || null;
  }

  /**
   * Crea un nuevo elemento y lo añade al servidor apropiado.
   * @param name - El nombre del nuevo elemento.
   * @param price - El precio del nuevo elemento.
   * @returns El nuevo elemento creado.
   */
  static async createItem(name: string, price: number) {
    const newItem: Item = { id: currentId++, name, price };
    if (newItem.id % 2 === 0) {
      itemsServerA.push(newItem);
    } else {
      itemsServerB.push(newItem);
    }
    return newItem;
  }

  /**
   * Actualiza un elemento existente por su ID en el servidor apropiado.
   * Si se encuentra el elemento, se actualiza el nombre y el precio.
   * @param id - El ID del elemento a actualizar.
   * @param name - El nuevo nombre del elemento.
   * @param price - El nuevo precio del elemento.
   * @returns El elemento actualizado, o `null` si no se encuentra.
   */
  static async updateItem(id: number, name: string, price: number) {
    const server = id % 2 === 0 ? itemsServerA : itemsServerB;
    const item = server.find((item) => item.id === id);
    if (item) {
      item.name = name;
      item.price = price;
      return item;
    }
    return null;
  }

  /**
   * Elimina un elemento por su ID del servidor apropiado.
   * Si se encuentra el elemento, se elimina de la lista.
   * @param id - El ID del elemento a eliminar.
   * @returns `true` si la eliminación fue exitosa, o `false` si no se encuentra el elemento.
   */
  static async deleteItem(id: number) {
    const server = id % 2 === 0 ? itemsServerA : itemsServerB;
    const index = server.findIndex((item) => item.id === id);
    if (index !== -1) {
      server.splice(index, 1);
      return true;
    }
    return false;
  }
}