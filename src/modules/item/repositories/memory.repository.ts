import { ItemRepository } from "./repository.interface";

/**
 * In-memory implementation of the ItemRepository interface.
 * This class provides methods to interact with items stored in memory.
 */
export class MemoryRepository implements ItemRepository {
    private items: any[] = [];
    private currentId = 1;

    /**
     * Initializes the in-memory repository by resetting items and currentId.
     * @returns {Promise<void>} A promise that resolves when the initialization is complete.
     */
    async initialize(): Promise<void> {
        this.items = [];
        this.currentId = 1;
    }

    /**
     * Stops the in-memory repository by resetting items and currentId.
     * @returns {Promise<void>} A promise that resolves when the stop operation is complete.
     */
    async stop(): Promise<void> {
        this.items = [];
        this.currentId = 1;
    }

    /**
     * Finds all items in the repository.
     * @returns {Promise<any[]>} A promise that resolves to an array of items.
     */
    async find(): Promise<any[]> {
        return this.items;
    }

    /**
     * Finds a specific item by its ID.
     * @param {number} id - The ID of the item to find.
     * @returns {Promise<any | null>} A promise that resolves to the item if found, or null if not found.
     */
    async findOne(id: number): Promise<any | null> {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            return null;
        }
        
        return item;
    }

    /**
     * Saves a new item to the repository.
     * @param {any} item - The item to save.
     * @returns {Promise<any>} A promise that resolves to the saved item.
     */
    async save(item: any): Promise<any> {
        const newItem = { ...item };
        newItem.id = this.currentId++;
        this.items.push(newItem);
        
        return newItem;
    }

    /**
     * Finds a specific item by its ID and updates it.
     * @param {number} id - The ID of the item to update.
     * @param {any} item - The new item data.
     * @returns {Promise<any | null>} A promise that resolves to the updated item if found, or null if not found.
     */
    async findOneAndUpdate(id: number, item: any): Promise<any | null> {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return null;
        }
        this.items[itemIndex] = { id, ...item };
        
        return this.items[itemIndex];
    }
    
    /**
     * Finds a specific item by its ID and deletes it.
     * @param {number} id - The ID of the item to delete.
     * @returns {Promise<any | null>} A promise that resolves to the deleted item if found, or null if not found.
     */
    async findOneAndDelete(id: number): Promise<any | null> {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return null;
        }
        const deletedItem = this.items.splice(itemIndex, 1);
        
        return deletedItem[0];
    }
}