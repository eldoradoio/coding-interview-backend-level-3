import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from '../services';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';

const validationPipe = (schema: any) => (request: Request, h: ResponseToolkit) => {
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
    private itemService: ItemService;

    constructor() {
        this.itemService = new ItemService();
    }

    public init(server: any) {
        server.route([
            {
                method: 'GET',
                path: '/items',
                handler: this.list.bind(this)
            },
            {
                method: 'GET',
                path: '/items/{id}',
                handler: this.get.bind(this)
            },
            {
                method: 'POST',
                path: '/items',
                options: {
                    pre: [
                        { method: validationPipe(itemCreationSchema), assign: 'validation' }
                    ],
                    handler: this.create.bind(this)
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
                }
            },
            {
                method: 'DELETE',
                path: '/items/{id}',
                handler: this.delete.bind(this)
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