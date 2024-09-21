import { Server } from "@hapi/hapi";
import { ItemRoutes } from "./infraestructure/web/item.routes";

export class ItemsModule {
  static async register(server: Server) {
    ItemRoutes(server);
  }
}
