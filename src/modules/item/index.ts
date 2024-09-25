import { Server } from "@hapi/hapi";
import mongoose from 'mongoose';
import { ItemController } from "./controllers";
import { ItemService } from "./services";
import { Configuration } from "../../config";

export const initializeModule = async (server: Server, configuration: Configuration) => {
    const { dbConnectionString } = configuration;
    const connection = await mongoose.connect(dbConnectionString);
    const itemService = new ItemService(connection);
    const itemController = new ItemController(itemService);
    itemController.init(server);
};