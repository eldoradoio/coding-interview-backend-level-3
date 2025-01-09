/**
 * @fileoverview Implementation of the IItemsRepository interface using Sequelize ORM.
 * This repository provides CRUD operations for the `item` model.
 * 
 * @module ItemRepositorySequelizeAdapter
 */

import { db } from '../../../../infraestructure/database/dbSequelize.ts';
import { initModels } from '../../../../models/init-models.ts';
import { IItemsRepository } from '../../domain/interfaces/IItemRepository.ts';
import { Items } from '../../domain/entities/item.ts';

const { item } = initModels(db);

/**
 * Sequelize adapter for managing items in the database.
 * Implements the IItemsRepository interface.
 * 
 * @implements {IItemsRepository}
 */
export class ItemRepositorySequelizeAdapter implements IItemsRepository {
    
    /**
     * Reference to the Sequelize `item` model.
     * @private
     */
    private itemModel;

    /**
     * Initializes the repository with the `item` model.
     */
    constructor() {
        this.itemModel = item;
    }

    /**
     * Retrieves all items from the database.
     * 
     * @returns {Promise<Array>} A promise resolving to an array of all items.
     */
    async findAll() {
        return this.itemModel.findAll({ attributes: ['id', 'name', 'price'] });
    }

    /**
     * Finds a single item by its ID.
     * 
     * @param {number} data - The ID of the item to find.
     * @returns {Promise<Object|null>} A promise resolving to the item if found, or null if not.
     */
    async findItemById(data: number) {
        return await this.itemModel.findOne({ where: { id: data }, paranoid: true, attributes: ['id', 'name', 'price'] });
    }

    /**
     * Creates a new item in the database.
     * 
     * @param {Items} data - The data for the new item.
     * @returns {Promise<Object>} A promise resolving to the created item.
     */
    async createItem(data: Items): Promise<Items> {
        const { id, name, price } = await this.itemModel.create(data);
        return {
            id, 
            name, 
            price
        }
    }

    /**
     * Updates an existing item in the database.
     * 
     * @param {Items} data - The updated data for the item.
     * @returns {Promise<number>} A promise resolving to the number of affected rows.
     */
    async updateItem(data: Items): Promise<any> {
        const [affectedCount, affectedRows] = await this.itemModel.update(data, { 
            where: { id: data.id },
            returning: true
        });
       return;
    }

    /**
     * Deletes an item from the database by its ID.
     * 
     * @param {number} data - The ID of the item to delete.
     * @returns {Promise<number>} A promise resolving to the number of affected rows.
     */
    async deleteItem(data: number): Promise<number> {
        return this.itemModel.destroy({ where: { id: data } });
    }
}
