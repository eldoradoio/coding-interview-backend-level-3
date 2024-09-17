type Item = {
  id: number;
  name: string;
  price: number;
};

let items: Item[] = [];
let currentId = 1;

export class ItemService {
  /**
   * Retorna todos los elementos almacenados.
   * @returns Una lista de todos los elementos.
   */
  static async getAllItems() {
    return items;
  }

  /**
   * Busca y retorna un elemento por su ID.
   * @param id - El ID del elemento que se busca.
   * @returns El elemento si se encuentra, o `null` si no existe.
   */
  static async getItemById(id: number) {
    return items.find((item) => item.id === id) || null;
  }

  /**
   * Crea un nuevo elemento y lo añade a la lista.
   * @param name - El nombre del nuevo elemento.
   * @param price - El precio del nuevo elemento.
   * @returns El nuevo elemento creado.
   */
  static async createItem(name: string, price: number) {
    const newItem: Item = { id: currentId++, name, price };
    items.push(newItem);
    return newItem;
  }

  /**
   * Actualiza un elemento existente por su ID.
   * Si se encuentra el elemento, se actualiza el nombre y el precio.
   * @param id - El ID del elemento a actualizar.
   * @param name - El nuevo nombre del elemento.
   * @param price - El nuevo precio del elemento.
   * @returns El elemento actualizado, o `null` si no se encuentra.
   */
  static async updateItem(id: number, name: string, price: number) {
    const item = items.find((item) => item.id === id);
    if (item) {
      item.name = name;
      item.price = price;
      return item;
    }
    return null;
  }

  /**
   * Elimina un elemento por su ID.
   * Si se encuentra el elemento, se elimina de la lista.
   * @param id - El ID del elemento a eliminar.
   * @returns `true` si la eliminación fue exitosa, o `false` si no se encuentra el elemento.
   */
  static async deleteItem(id: number) {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      return true;
    }
    return false;
  }
}
