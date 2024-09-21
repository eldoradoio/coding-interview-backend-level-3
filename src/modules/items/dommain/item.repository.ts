import { Item } from "./item.entity";

export interface ItemRepository{
    findAll(): Promise<Item[]>;
    findById(id:number): Promise<Item | null>;
    save(item:Item): Promise<Item>;
    delete(id:number):Promise<void>       
}