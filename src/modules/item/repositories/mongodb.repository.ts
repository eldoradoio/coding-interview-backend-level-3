import mongoose from 'mongoose';
import { ItemRepository } from "./repository.interface";
import { Item } from '../models';

/**
 * MongoDB implementation of the ItemRepository interface.
 * This class provides methods to interact with items stored in a MongoDB database.
 */
export class MongoDBRepository implements ItemRepository {
    private connection: mongoose.Connection | undefined;

    /**
     * Creates an instance of MongoDBRepository.
     * @param {string} dbConnectionString - The connection string for the MongoDB database.
     */
    constructor(private readonly dbConnectionString: string) {}

    /**
     * Initializes the MongoDB connection.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     */
    async initialize(): Promise<void> {
        const connection = await mongoose.connect(this.dbConnectionString);
        this.connection = connection.connection;
    }

    /**
     * Initializes the MongoDB connection.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     */
    async stop(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
        }
    }

    /**
     * Finds all items in the MongoDB collection.
     * @returns {Promise<any[]>} A promise that resolves to an array of items.
     */
    async find(): Promise<any[]> {
        return Item.find();
    }

    /**
     * Finds a specific item by its ID.
     * @param {number} id - The ID of the item to find.
     * @returns {Promise<any | null>} A promise that resolves to the item if found, or null if not found.
     */
    async findOne(id: number): Promise<any | null> {
        const item = await Item.findOne({ id });
        if (!item) {
            return null
        }

        return item;
    }
    
    /**
     * Saves a new item to the MongoDB collection.
     * @param {any} item - The item to save.
     * @returns {Promise<any>} A promise that resolves to the saved item.
     */
    async save(item: any): Promise<any> {
        return Item.create(item);
    }

    /**
     * Finds a specific item by its ID and updates it.
     * @param {number} id - The ID of the item to update.
     * @param {any} item - The new item data.
     * @returns {Promise<any | null>} A promise that resolves to the updated item if found, or null if not found.
     */
    async findOneAndUpdate(id: number, item: any): Promise<any | null> {
        const updatedItem = await Item.findOneAndUpdate({ id }, item, { new: true });
        if (!updatedItem) {
            return null
        }
    
        return updatedItem;
    }

    /**
     * Finds a specific item by its ID and deletes it.
     * @param {number} id - The ID of the item to delete.
     * @returns {Promise<any | null>} A promise that resolves to the deleted item if found, or null if not found.
     */
    async findOneAndDelete(id: number): Promise<any | null> {
        const deletedItem = await Item.findOneAndDelete({ id });
        if (!deletedItem) {
            return null
        }

        return deletedItem;
    }
}