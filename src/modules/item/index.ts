import { Server } from "@hapi/hapi";
import mongoose from 'mongoose';
import { ItemController } from "./controllers";
import { ItemService, ItemService2 } from "./services";
import { Configuration } from "../../config";

export const initializeModule = async (server: Server, configuration: Configuration) => {
    const { dbConnectionString } = configuration;
    try {
        const connection = await mongoose.connect(dbConnectionString, { dbName: 'test' });
        const itemService = new ItemService(connection);
        const itemController = new ItemController(itemService);
        itemController.init(server);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

export const stopModule = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error closing MongoDB connection', error);
    }
};