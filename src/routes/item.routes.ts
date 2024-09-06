import { Server } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";
import {
  validateItem,
  validateQueryParams,
} from "../middleware/validation.middleware";

const itemController = new ItemController();

export const itemRoutes = (server: Server) => {
  server.route([
    {
      method: "GET",
      path: "/items",
      handler: itemController.getAllItems,
    },
    {
      method: "GET",
      path: "/items/{id}",
      handler: itemController.getItemById,
    },
    {
      method: "GET",
      path: "/items/paginated",
      handler: itemController.getItemsPaginated,
      options: {
        pre: [validateQueryParams],
      },
    },
    {
      method: "POST",
      path: "/items",
      handler: itemController.createItem,
      options: {
        pre: [{ method: validateItem }],
      },
    },
    {
      method: "PUT",
      path: "/items/{id}",
      handler: itemController.updateItem,
      options: {
        pre: [{ method: validateItem }],
      },
    },
    {
      method: "DELETE",
      path: "/items/{id}",
      handler: itemController.deleteItem,
    },
  ]);
};
