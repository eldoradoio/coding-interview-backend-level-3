import { Server } from "@hapi/hapi";
import { HealthController } from "./controllers";
import { Configuration } from "../../config";

export const initializeModule = async (server: Server, configuration: Configuration) => {
    const healthController = new HealthController();
    healthController.init(server);
};