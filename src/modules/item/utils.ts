import { ItemDTO } from "./dtos";

/**
 * Converts a payload object to an ItemDTO.
 * @param {any} payload - The payload object containing item data.
 * @returns {ItemDTO} The converted ItemDTO object.
 */
export const toDTO = (payload: any): ItemDTO => {
    const { id, name, price } = payload;
    const item = new ItemDTO();
    item.id = Number(id);
    item.name = name;
    item.price = price;
    
    return item;
};