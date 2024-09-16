import { Request, ResponseToolkit } from "@hapi/hapi";

// DTOs
import { CreateItemDTO } from "../DTOs/createItems.dto";
import { UpdateItemDTO } from "../DTOs/updateItems.dto";

// Servicios
import { ItemService } from "../service/items.services";
const itemService = new ItemService();


/**
 * Controlador para manejar las operaciones relacionadas con los ítems.
 * 
 * Este controlador proporciona los métodos necesarios para listar, crear, actualizar 
 * y eliminar ítems. Todos los métodos interactúan con el servicio de ítems y devuelven 
 * respuestas HTTP con los códigos de estado correspondientes.
 * 
 * @class ItemController
 * @method listItems - Método para listar todos los ítems.
 * @method createItem - Método para crear un ítem nuevo.
 * @method getItemById - Método para obtener un ítem por su ID.
 * @method updateItem - Método para actualizar un ítem.
 * @method deleteItem - Método para eliminar un ítem.
 */
export class ItemController {
   /**
   * Listar todos los ítems.
   * 
   * @param request - La solicitud HTTP.
   * @param h - El toolkit de respuesta de Hapi.
   * @returns La respuesta HTTP con la lista de ítems y el código de estado 200.
   */
  async listItems(request: Request, h: ResponseToolkit) {
    const items = await itemService.getAllItems();
    return h.response(items).code(200);
  }

  /**
   * Crear un ítem.
   * 
   * @param request - La solicitud HTTP que contiene los datos del ítem en el payload.
   * @param h - El toolkit de respuesta de Hapi.
   * @returns  La respuesta HTTP con el ítem creado y el código de estado 201, o un error y el código de estado 400.
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
   * Obtener un ítem por su ID.
   * 
   * @param request - La solicitud HTTP que contiene el ID del ítem en los parámetros.
   * @param h - El toolkit de respuesta de Hapi.
   * @returns  La respuesta HTTP con el ítem encontrado y el código de estado 200, o un mensaje de error y el código de estado 404 si no se encuentra el ítem.
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
   * Actualizar un ítem.
   * 
   * @param  request - La solicitud HTTP que contiene el ID del ítem y los datos actualizados en el payload.
   * @param  h - El toolkit de respuesta de Hapi.
   * @returns  La respuesta HTTP con el ítem actualizado y el código de estado 200, o un mensaje de error y el código de estado 400/404.
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
   * Eliminar un ítem.
   * 
   * @param  request - La solicitud HTTP que contiene el ID del ítem en los parámetros.
   * @param  h - El toolkit de respuesta de Hapi.
   * @returns  La respuesta HTTP con el código de estado 204 si se elimina correctamente, o un mensaje de error y el código de estado 404 si no se encuentra el ítem.
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