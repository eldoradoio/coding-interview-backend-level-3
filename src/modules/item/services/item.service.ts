import { ItemNotFoundError } from '../errors';
import { ItemDTO } from '../dtos';
import { toDTO } from '../utils';
import { ItemRepository } from '../repositories';

/**
 * Service for handling item-related operations.
 */
export class ItemService {

    constructor(private readonly repository: ItemRepository) {}

    /**
     * Retrieves a list of all items.
     * @returns {Promise<ItemDTO[]>} A promise that resolves to an array of item DTOs.
     */
    async list(): Promise<ItemDTO[]> {
        const items: any[] = await this.repository.find();
        
        return items.map(item => toDTO(item));
    }

    /**
     * Retrieves a specific item by its ID.
     * @param {number} id - The ID of the item to retrieve.
     * @returns {Promise<ItemDTO>} A promise that resolves to the item DTO.
     * @throws {ItemNotFoundError} If the item is not found.
     */
    async get(id: number): Promise<ItemDTO> {
        const item: any | null = await this.repository.findOne(id);
        if (!item) {
            throw new ItemNotFoundError();
        }
        
        return toDTO(item);
    }

    /**
     * Creates a new item.
     * @param {ItemDTO} dto - The data transfer object containing the item details.
     * @returns {Promise<ItemDTO>} A promise that resolves to the created item DTO.
     */
    async create(dto: ItemDTO): Promise<ItemDTO> {
        const createdItem = await this.repository.save(dto);

        return toDTO(createdItem);
    }

    /**
     * Updates an existing item.
     * @param {ItemDTO} dto - The data transfer object containing the updated item details.
     * @returns {Promise<ItemDTO>} A promise that resolves to the updated item DTO.
     * @throws {ItemNotFoundError} If the item is not found.
     */
    async update(dto: ItemDTO): Promise<ItemDTO> {
        const { id } = dto;
        const item: any | null = await this.repository.findOneAndUpdate(id, dto);
        if (!item) {
            throw new ItemNotFoundError();
        }

        return toDTO(item);
    }

    /**
     * Deletes an existing item.
     * @param {number} id - The ID of the item to delete.
     * @returns {Promise<void>} A promise that resolves when the item is deleted.
     * @throws {ItemNotFoundError} If the item is not found.
     */
    async delete(id: number): Promise<null> {
        const item: any | null = await this.repository.findOneAndDelete(id);
        if (!item) {
            throw new ItemNotFoundError();
        }

        return null;
    }
}