import Joi, { ObjectSchema } from "joi";
import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import { ItemService } from '../services';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';

const validationPipe = (schema: ObjectSchema) => (request: Request, h: ResponseToolkit) => {
    const { error } = schema.validate(request.payload);
    if (error) {
        const errors = error.details.map((detail: any) => ({
            field: detail.context?.key,
            message: detail.message,
        }));

        return h.response({ errors }).code(400).takeover();
    }

    return h.continue;
}

export class ItemController {
    private readonly itemService: ItemService;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }

    public init(server: Server) {
        server.route([
            {
                method: 'GET',
                path: '/items',
                options: {
                    handler: this.list.bind(this),
                    description: 'Returns a list of items',
                    notes: 'Returns a list of items',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/items/{id}',
                options: {
                    handler: this.get.bind(this),
                    description: 'Returns a single item',
                    notes: 'Returns a single item',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().required().description('ID of the item')
                        })
                    }
                }
            },
            {
                method: 'POST',
                path: '/items',
                options: {
                    pre: [
                        { method: validationPipe(itemCreationSchema), assign: 'validation' }
                    ],
                    handler: this.create.bind(this),
                    description: 'Creates a new item',
                    notes: 'Creates a new item',
                    tags: ['api'],
                }
            },
            {
                method: 'PUT',
                path: '/items/{id}',
                options: {
                    pre: [
                        { method: validationPipe(itemUpdateSchema), assign: 'validation' }
                    ],
                    handler: this.update.bind(this),
                    description: 'Updates an item',
                    notes: 'Updates an item',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().required().description('ID of the item')
                        }),
                    },
                }
            },
            {
                method: 'DELETE',
                path: '/items/{id}',
                options: {
                    handler: this.delete.bind(this),
                    description: 'Ping',
                    notes: 'Deletes an item',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().required().description('ID of the item')
                        }),
                    },
                },
            }
        ]);
    }

    public async list(request: Request, response: ResponseToolkit) {
        try {
            const result = await this.itemService.list();
            return response.response(result).code(200);
        } catch (error) {
            return response.response({ error: 'Failed to fetch items' }).code(500);
        }
    }

    public async get(request: Request, response: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const result = await this.itemService.get(id);
            return response.response(result).code(200);
        } catch (error) {
            return response.response({ error: 'Failed to fetch item' }).code(404);
        }
    }

    public async create(request: Request, response: ResponseToolkit) {
        try {
            const { name, price } = request.payload as { name: string; price: number };
            const result = await this.itemService.create(name, price);
            return response.response(result).code(201);
        } catch (error) {
            return response.response({ error: 'Failed to create item' }).code(500);
        }
    }

    public async update(request: Request, response: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const { name, price } = request.payload as { name: string; price: number };
            const result = await this.itemService.update(id, name, price);
            return response.response(result).code(200);
        } catch (error) {
            return response.response({ error: 'Failed to update item' }).code(500);
        }
    }

    public async delete(request: Request, response: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const result = await this.itemService.delete(id);
            return response.response(result).code(204);
        } catch (error) {
            return response.response({ error: 'Failed to delete item' }).code(500);
        }
    }
};