// Import necessary modules at the top if not already imported
import { Server } from '@hapi/hapi';
import { ZodError } from 'zod';
import { ItemRepository } from './items_db_repository';
import { zod_createItemSchema, zod_updateItemSchema } from './items_validation';

export const itemsDefineRoutes = async (server: Server) => {


    const itemRepo = new ItemRepository();
    await itemRepo.initializeItemsTable();

    // --------------------------------------------------------------------------
    // (A) List all items
    // --------------------------------------------------------------------------
    server.route({
        method: 'GET',
        path: '/items',
        handler: async (request, h) => {
            try {
                const items = await itemRepo.listAllItems();
                return h.response(items).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ error: 'Error al listar items' }).code(500);
            }
        },
    });

    // --------------------------------------------------------------------------
    // (B) Create a new item
    // --------------------------------------------------------------------------
    server.route({
        method: 'POST',
        path: '/items',
        handler: async (request, h) => {
            try {
                // Valida el payload con el esquema
                const data = zod_createItemSchema.parse(request.payload);

                // Si llega aquí, los datos son válidos
                const newItem = await itemRepo.createItem(data.name, data.price);
                return h.response(newItem).code(201);

            } catch (error) {
                // Si la validación falla, Zod lanza un ZodError
                if (error instanceof ZodError) {
                    // Mapeamos cada issue de Zod al formato { field, message } de tu test
                    const errors = error.issues.map(issue => ({
                        field: issue.path.join('.'), // en tu caso será "name" o "price"
                        message: issue.message
                    }));

                    // Retornamos el array de errores con un 400
                    return h.response({ errors }).code(400);
                }

                // En caso de error no manejado
                return h.response({ error: 'Error al crear item' }).code(500);
            }
        },
    });

    // --------------------------------------------------------------------------
    // (C) Get item by ID
    // --------------------------------------------------------------------------
    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            try {
                const { id } = request.params as { id: string };
                const numericId = Number(id);

                if (isNaN(numericId)) {
                    return h.response({ error: 'ID inválido' }).code(400);
                }

                const item = await itemRepo.readItem(numericId);

                if (!item) {
                    return h.response({ error: 'Item no encontrado' }).code(404);
                }
                return h.response(item).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ error: 'Error al obtener item' }).code(500);
            }
        },
    });

    // --------------------------------------------------------------------------
    // (D) Update item by ID
    // --------------------------------------------------------------------------
    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: async (request, h) => {
            try {
                // 1. Validar el payload
                const updateData = zod_updateItemSchema.parse(request.payload);

                // 2. Obtener el id de los parámetros y convertirlo a número
                const { id } = request.params as { id: string };
                const numericId = Number(id);

                if (isNaN(numericId)) {
                    return h.response({ error: 'ID inválido' }).code(400);
                }

                // 3. Desestructurar los campos validados
                const { name, price } = updateData;

                // 4. Actualizar y responder
                const updatedItem = await itemRepo.updateItem(numericId, name, price);
                if (!updatedItem) {
                    return h.response({ error: 'Item no encontrado para actualizar' }).code(404);
                }
                return h.response(updatedItem).code(200);

            } catch (error) {
                // Capturamos el error Zod
                if (error instanceof ZodError) {
                    // Mapeamos cada error al formato que esperan los tests
                    const errors = error.issues.map(issue => ({
                        field: issue.path.join('.'), // p.ej. "price"
                        message: issue.message,       // p.ej. "Field \"price\" cannot be negative"
                    }));
                    return h.response({ errors }).code(400);
                }

                // Errores inesperados (DB, etc.)
                console.error(error);
                return h.response({ error: 'Error al actualizar item' }).code(500);
            }
        },
    });

    // --------------------------------------------------------------------------
    // (E) Delete item by ID
    // --------------------------------------------------------------------------
    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            try {
                const { id } = request.params as { id: string };
                const numericId = Number(id);

                if (isNaN(numericId)) {
                    return h.response({ error: 'ID inválido' }).code(400);
                }

                const wasDeleted = await itemRepo.deleteItem(numericId);

                if (!wasDeleted) {
                    return h.response({ error: 'No se pudo eliminar el item' }).code(404);
                }

                return h.response().code(204);
            } catch (error) {
                console.error(error);
                return h.response({ error: 'Error al eliminar item' }).code(500);
            }
        },
    });
};
