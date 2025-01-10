/**
 * @fileoverview Interface for the Items Repository.
 * Defines the methods required for managing items in the application.
 * 
 * @module IItemsRepository
 */

import { Items } from '../entities/item.ts';

/**
 * Interface for the Items Repository.
 * Specifies the CRUD operations for the `Items` entity.
 */
export interface IItemsRepository {

    /**
     * Retrieves all items.
     * 
     * @returns {Promise<Items[]>} A promise resolving to an array of all items.
     */
    findAll(): Promise<Items[]>;

    /**
     * Finds an item by its ID.
     * 
     * @param {number} id - The ID of the item to find.
     * @returns {Promise<Items | null>} A promise resolving to the item if found, or null if not.
     */
    findItemById(id: number): Promise<Items | null>;

    /**
     * Creates a new item.
     * 
     * @param {Items} data - The data for the new item.
     * @returns {Promise<Items>} A promise resolving to the created item.
     */
    createItem(data: Items): Promise<Items>;

    /**
     * Updates an existing item.
     * 
     * @param {Items} data - The updated data for the item.
     * @returns {Promise<number>} A promise resolving to the number of affected rows.
     */
    updateItem(data: Items): Promise<Items>;

    /**
     * Deletes an item by its ID.
     * 
     * @param {number} data - The ID of the item to delete.
     * @returns {Promise<any>} A promise resolving to the result of the deletion operation.
     */
    deleteItem(data: number): Promise<any>;
}
