import { Request, ResponseToolkit } from "@hapi/hapi";

// DTOs
import { CreateItemDTO } from "../DTOs/createItems.dto";
import { UpdateItemDTO } from "../DTOs/updateItems.dto";

// Servicios
import { ItemService } from "../service/items.services";
const itemService = new ItemService();


/**
 * Controlador para los ítems.
 * @class
 * @method listItems - Método para listar todos los ítems.
 * @method createItem - Método para crear un ítem.
 * @method getItemById - Método para obtener un ítem por su ID.
 * @method updateItem - Método para actualizar un ítem.
 * @method deleteItem - Método para eliminar un ítem.
 * 
 */
export class ItemController {
  // Listar todos los ítems
  async listItems(request: Request, h: ResponseToolkit) {
    const items = await itemService.getAllItems();
    return h.response(items).code(200);
  }

  /**
 * Controlador para crear un ítem.
 * @param {Request} request - La solicitud HTTP que contiene los datos del ítem.
 * @param {ResponseToolkit} h - El toolkit de respuesta de Hapi.
 * @returns {ResponseObject} La respuesta HTTP con el ítem creado y el código de estado 201, o un error y el código de estado 400.
 */
  async createItem(request: Request, h: ResponseToolkit) {
    try {
      const validatedData = CreateItemDTO.validate(request.payload);

      const newItem = await itemService.createItem(validatedData.name, validatedData.price);

      return h.response(newItem).code(201);

    } catch (error) {
      return h.response({ errors: error }).code(400);
    }
  }
  

  /**
   * controlador para obtener un ítem por su ID.
   * @param {Request} request - La solicitud HTTP que contiene los datos del ítem.
   * @param {ResponseToolkit} h - El toolkit de respuesta de Hapi.
   * @returns {ResponseObject} La respuesta HTTP con el ítem encontrado y el código de estado 200, o un mensaje de error y el código de estado 404. 
   */
  async getItemById(request: Request, h: ResponseToolkit) {
    
    const { id } = request.params;

    const item = await itemService.getItemById(Number(id));

    if (!item) {
      return h.response({ message: "Item not found" }).code(404);
    }

    return h.response(item).code(200);
  }

  /**
   * controlador para actualizar un ítem.
   * @param {Request} request - La solicitud HTTP que contiene los datos del ítem.
   * @param {ResponseToolkit} h - El toolkit de respuesta de Hapi.
   * @returns {ResponseObject} La respuesta HTTP con el ítem actualizado y el código de estado 200, o un mensaje de error y el código de estado 404.
   */
  async updateItem(request: Request, h: ResponseToolkit) {
    try {
      const { id } = request.params;
      
      
      const validatedData = UpdateItemDTO.validate(request.payload);
      
      
      const numericPrice = validatedData.price !== undefined ? Number(validatedData.price) : undefined;
  
      
      const updatedItem = await itemService.updateItem(Number(id), validatedData.name, numericPrice || 0);
  
      if (!updatedItem) {
        return h.response({ message: "Item not found" }).code(404);
      }
  
      return h.response(updatedItem).code(200);
    } catch (error) {
      return h.response({ errors: error }).code(400); 
    }
  }

  /**
   * 
   * @param {Request} request - La solicitud HTTP que contiene los datos del ítem.
   * @param {ResponseToolkit} h - El toolkit de respuesta de Hapi. 
   * @returns {ResponseObject} La respuesta HTTP con el código de estado 204 si se eliminó correctamente, o un mensaje de error y el código de estado 404 si no se encontró el ítem.
   */
  async deleteItem(request: Request, h: ResponseToolkit) {
    const { id } = request.params;

    const item = await itemService.getItemById(Number(id));

    if (!item) {
      return h.response({ message: "Item not found" }).code(404);
    }

    await itemService.deleteItem(Number(id));
    return h.response().code(204); 
  }
  
};