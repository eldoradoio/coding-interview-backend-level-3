import Joi from "joi";
import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import { ItemService } from '../services';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';
import { validationPipe } from "../../../pipelines";
import { handleErrors } from "../../../handlers";

export class ItemController {
    private readonly itemService: ItemService;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }

    public async init(server: Server) {
        server.route([
            {
                method: 'GET',
                path: '/items',
                options: {
                    handler: handleErrors(this.list.bind(this)),
                    description: 'Returns a list of items',
                    notes: 'Returns a list of items',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/items/{id}',
                options: {
                    handler: handleErrors(this.get.bind(this)),
                    description: 'Returns a single item',
                    notes: 'Returns a single item',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().required().description('ID of the item')
                        }),
                    },
                }
            },
            {
                method: 'POST',
                path: '/items',
                options: {
                    pre: [
                        { method: validationPipe(itemCreationSchema), assign: 'validation' }
                    ],
                    handler: handleErrors(this.create.bind(this)),
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
                    handler: handleErrors(this.update.bind(this)),
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
                    handler: handleErrors(this.delete.bind(this)),
                    description: 'Deletes an item',
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
        const result = await this.itemService.list();

        return response.response(result).code(200);
    }

    public async get(request: Request, response: ResponseToolkit) {
        const { params: { id }} = request;
        const result = await this.itemService.get(Number(id));

        return response.response(result).code(200);
    }

    public async create(request: Request, response: ResponseToolkit) {
        const { name, price } = request.payload as { name: string; price: number };
        const result = await this.itemService.create(name, price);

        return response.response(result).code(201);
    }

    public async update(request: Request, response: ResponseToolkit) {
        const { params: { id }} = request;
        const { name, price } = request.payload as { name: string; price: number };
        const result = await this.itemService.update(Number(id), name, price);

        return response.response(result).code(200);
    }

    public async delete(request: Request, response: ResponseToolkit) {
        const { params: { id }} = request;
        await this.itemService.delete(Number(id));
        
        return response.response().code(204);
    }
};