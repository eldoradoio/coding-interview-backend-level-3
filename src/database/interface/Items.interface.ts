/**
 * Representa un item en el sistema.
 * 
 * @interface iItem
 * @property {number} id - Identificador único del item.
 * @property {string} name - Nombre del item.
 * @property {number} price - Precio del item, representado como un número.
 */
export interface iItem {
    id: number;
    name: string;
    price: number;
}