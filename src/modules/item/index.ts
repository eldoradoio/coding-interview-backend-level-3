import { Server } from "@hapi/hapi";
import { ItemController } from "./controllers";
import { ItemService } from "./services";

export const initializeModule = (server: Server) => {
    const itemService = new ItemService();
    const itemController = new ItemController(itemService);
    itemController.init(server);
};