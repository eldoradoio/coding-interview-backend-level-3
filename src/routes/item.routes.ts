import { Server } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";
import {
  validateItem,
  validateQueryParams,
} from "../middleware/validation.middleware";

export const itemRoutes = (server: Server, itemController: ItemController) => {
  server.route([
    {
      method: "GET",
      path: "/ping",
      handler: (request, h) => {
        return h.response({ ok: true }).code(200);
      },
    },
    {
      method: "GET",
      path: "/items",
      handler: itemController.getAllItems.bind(itemController),
    },
    {
      method: "GET",
      path: "/items/{id}",
      handler: itemController.getItemById.bind(itemController),
    },
    {
      method: "GET",
      path: "/items/paginated",
      handler: itemController.getItemsPaginated.bind(itemController),
      options: {
        pre: [validateQueryParams],
      },
    },
    {
      method: "POST",
      path: "/items",
      handler: itemController.createItem.bind(itemController),
      options: {
        pre: [{ method: validateItem }],
      },
    },
    {
      method: "PUT",
      path: "/items/{id}",
      handler: itemController.updateItem.bind(itemController),
      options: {
        pre: [{ method: validateItem }],
      },
    },
    {
      method: "DELETE",
      path: "/items/{id}",
      handler: itemController.deleteItem.bind(itemController),
    },
  ]);
};
