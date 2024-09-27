import { Server } from "@hapi/hapi";
import { ItemController } from "./controllers";
import { ItemService } from "./services";
import { Configuration } from "../../config";
import { MongoDBRepository, MemoryRepository } from "./repositories";

let itemRepository: MemoryRepository | MongoDBRepository;

/**
 * Initializes the item module.
 * Depending on the configuration, it creates either a memory-based repository or a MongoDB-based repository.
 * @param {Server} server - The Hapi server instance.
 * @param {Configuration} configuration - The configuration object containing repository type and database connection string.
 * @returns {Promise<void>} A promise that resolves when the module is initialized.
 */
export const initializeModule = async (server: Server, configuration: Configuration): Promise<void> => {
    const { repositoryType, dbConnectionString } = configuration;
    try {
        itemRepository = repositoryType === 'memory' ? new MemoryRepository() : new MongoDBRepository(dbConnectionString);
        itemRepository.initialize();
        const itemService = new ItemService(itemRepository);
        const itemController = new ItemController(itemService);
        itemController.init(server);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

/**
 * Stops the item module.
 * Closes the repository connection.
 * @returns {Promise<void>} A promise that resolves when the module is stopped.
 */
export const stopModule = async (): Promise<void> => {
    try {
        return await itemRepository.stop();
    } catch (error) {
        console.error('Error closing respository connection', error);
    }
};