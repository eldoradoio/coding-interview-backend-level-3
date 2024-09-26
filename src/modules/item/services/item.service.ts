import { Item, DocumentItem } from '../models';
import { ItemNotFoundError } from '../errors';
import { ItemDTO } from '../dtos';
import { toDTO } from '../utils';

export class ItemService {

    async list(): Promise<ItemDTO[]> {
        const items: DocumentItem[] = await Item.find().exec();
        
        return items.map(item => toDTO(item));
    }

    async get(id: number): Promise<ItemDTO> {
        const item: DocumentItem | null = await Item.findOne({ id });
        if (!item) {
            throw new ItemNotFoundError();
        }
        
        return toDTO(item);
    }

    async create(dto: ItemDTO): Promise<ItemDTO> {
        const newItem: DocumentItem = new Item(dto);
        const createdItem = await newItem.save();

        return toDTO(createdItem);
    }

    async update(dto: ItemDTO): Promise<ItemDTO> {
        const { id, name, price } = dto;
        const item: DocumentItem | null = await Item.findOneAndUpdate({ id }, { name, price }, { new: true });
        if (!item) {
            throw new ItemNotFoundError();
        }

        return toDTO(item);
    }

    async delete(id: number): Promise<null> {
        const item: DocumentItem | null = await Item.findOneAndDelete({ id });
        if (!item) {
            throw new ItemNotFoundError();
        }

        return null;
    }
}