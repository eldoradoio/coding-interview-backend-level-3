/**
 * Interface for item repository.
 * This interface defines the methods that any item repository implementation must provide.
 */
export interface ItemRepository {
    /**
     * Initializes the repository.
     * @returns {Promise<void>} A promise that resolves when the initialization is complete.
     */
    initialize(): Promise<void>;

    /**
     * Stops the repository.
     * @returns {Promise<void>} A promise that resolves when the stop operation is complete.
     */
    stop(): Promise<void>;

    /**
     * Finds all items in the repository.
     * @returns {Promise<any[]>} A promise that resolves to an array of items.
     */
    find(): Promise<any[]>;

    /**
     * Finds a specific item by its ID.
     * @param {number} id - The ID of the item to find.
     * @returns {Promise<any | null>} A promise that resolves to the item if found, or null if not found.
     */
    findOne(id: number): Promise<any | null>;

    /**
     * Saves a new item to the repository.
     * @param {any} item - The item to save.
     * @returns {Promise<any | null>} A promise that resolves to the saved item.
     */
    save(item: any): Promise<any | null>;

    /**
     * Finds a specific item by its ID and updates it.
     * @param {number} id - The ID of the item to update.
     * @param {any} item - The new item data.
     * @returns {Promise<any | null>} A promise that resolves to the updated item if found, or null if not found.
     */
    findOneAndUpdate(id: number, item: any): Promise<any | null>;

    /**
     * Finds a specific item by its ID and deletes it.
     * @param {number} id - The ID of the item to delete.
     * @returns {Promise<any | null>} A promise that resolves to the deleted item if found, or null if not found.
     */
    findOneAndDelete(id: number): Promise<any | null>;
}