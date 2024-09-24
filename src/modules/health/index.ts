import { Server } from "@hapi/hapi";
import { HealthController } from "./controllers";

export const initializeModule = (server: Server) => {
    const healthController = new HealthController();
    healthController.init(server);
};