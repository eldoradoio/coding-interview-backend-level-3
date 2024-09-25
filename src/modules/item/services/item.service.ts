import { IItem } from '../interfaces/item.interface';
import { Item, DocumentItem } from '../models';
import { ItemNotFoundError } from '../errors';

export class ItemService {
    private connection: any;

    constructor(connnection: any) {
        this.connection = connnection;
    }

    async list(): Promise<DocumentItem[]> {
        return await Item.find();
    }

    async get(id: number): Promise<any> {
        const item = await Item.findOne({ id });
        if (!item) {
            throw new ItemNotFoundError();
        }
        return item;
    }

    async create(name: string, price: number): Promise<DocumentItem> {
        const newItem = new Item({ name, price });
        
        return await newItem.save();
    }

    async update(id: number, name: string, price: number): Promise<DocumentItem> {
        const item = await Item.findOneAndUpdate({ id }, { name, price }, { new: true });
        if (!item) {
            throw new ItemNotFoundError();
        }

        return item;
    }

    async delete(id: number): Promise<null> {
        const item = await Item.findOneAndDelete({ id });
        if (!item) {
            throw new ItemNotFoundError();
        }

        return null;
    }
}