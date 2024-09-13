import { ItemManager } from './class/ItemManager';
const itemManager = new ItemManager();
export const defineRoutes = (server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            };
        }
    });
    // Ruta para listar todos los items
    server.route({
        method: 'GET',
        path: '/items',
        handler: async (request, h) => {
            return itemManager.getAllItems(); // Usa la clase para obtener los items   
        }
    });
    // Ruta para obtener un item por su ID
    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const item = itemManager.getItemById(parseInt(id));
            if (!item) {
                return h.response({ message: 'Item not found' }).code(404); // Si no existe, devuelve 404
            }
            return item;
        }
    });
    // Ruta para crear un nuevo item
    server.route({
        method: 'POST',
        path: '/items',
        handler: async (request, h) => {
            const { name, price } = request.payload;
            // Validación del campo 'price'
            if (price === undefined || price < 0) {
                return h.response({
                    errors: [
                        {
                            field: 'price',
                            message: price === undefined ? 'Field "price" is required' : 'Field "price" cannot be negative'
                        }
                    ]
                }).code(400);
            }
            const newItem = itemManager.createItem(name, price);
            return h.response(newItem).code(201);
        }
    });
    // Ruta para actualizar un item por su ID
    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const { name, price } = request.payload;
            // Validación del campo 'price'
            if (price < 0) {
                return h.response({
                    errors: [
                        {
                            field: 'price',
                            message: 'Field "price" cannot be negative'
                        }
                    ]
                }).code(400);
            }
            const updatedItem = itemManager.updateItem(parseInt(id), name, price);
            if (!updatedItem) {
                return h.response({ message: 'Item not found' }).code(404);
            }
            return h.response(updatedItem).code(200);
        }
    });
    // Ruta para eliminar un item por su ID
    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const success = itemManager.deleteItem(parseInt(id));
            if (!success) {
                return h.response({ message: 'Item not found' }).code(404);
            }
            return h.response().code(204);
        }
    });
};
