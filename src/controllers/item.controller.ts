import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from '../services/item.service';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';

export class ItemController {
    private itemService: ItemService;

    constructor() {
        this.itemService = new ItemService();
    }

    public async list(request: Request, h: ResponseToolkit) {
        try {
            const result = await this.itemService.list();
            return h.response(result).code(200);
        } catch (error) {
            return h.response({ error: 'Failed to fetch items' }).code(500);
        }
    }

    public async get(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const result = await this.itemService.get(id);
            return h.response(result).code(200);
        } catch (error) {
            return h.response({ error: 'Failed to fetch item' }).code(404);
        }
    }

    public async create(request: Request, h: ResponseToolkit) {
        try {
            const { name, price } = request.payload as { name: string; price: number };
            const { error } = itemCreationSchema.validate({ name, price });
            if (error) {
                const formattedError = error.details.map(detail => ({
                    field: detail.context?.key,
                    message: detail.message,
                }));
                return h.response({ errors: formattedError }).code(400);
            }
            const result = await this.itemService.create(name, price);
            return h.response(result).code(201);
        } catch (error) {
            return h.response({ error: 'Failed to create item' }).code(500);
        }
    }

    public async update(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const { name, price } = request.payload as { name: string; price: number };
            const { error } = itemUpdateSchema.validate({ name, price });
            if (error) {
                const formattedError = error.details.map(detail => ({
                    field: detail.context?.key,
                    message: detail.message,
                }));
                return h.response({ errors: formattedError }).code(400);
            }
            const result = await this.itemService.update(id, name, price);
            return h.response(result).code(200);
        } catch (error) {
            return h.response({ error: 'Failed to update item' }).code(500);
        }
    }

    public async delete(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const result = await this.itemService.delete(id);
            return h.response(result).code(204);
        } catch (error) {
            return h.response({ error: 'Failed to delete item' }).code(500);
        }
    }
};