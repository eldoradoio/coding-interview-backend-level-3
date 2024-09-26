import { ItemDTO } from "./dtos";

export const toDTO = (payload: any): ItemDTO => {
    const { id, name, price } = payload;
    const item = new ItemDTO();
    item.id = Number(id);
    item.name = name;
    item.price = price;
    
    return item;
};