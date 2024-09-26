import Joi from "joi";
import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import { ItemService } from '../services';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';
import { validationPipe } from "../../../pipelines";
import { handleErrors } from "../../../handlers";
import { ItemDTO } from "../dtos";
import { toDTO } from "../utils";

export class ItemController {
    private itemService!: ItemService;

    constructor(itemService: ItemService) {
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.itemService = itemService;
    }

    public setItemService(itemService: ItemService) {
        this.itemService = itemService;
    }

    public async init(server: Server) {
        server.route([
            {
                method: 'GET',
                path: '/items',
                options: {
                    handler: handleErrors(this.list),
                    description: 'Returns a list of items',
                    notes: 'Returns a list of items',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/items/{id}',
                options: {
                    handler: handleErrors(this.get),
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
                    handler: handleErrors(this.create),
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
                    handler: handleErrors(this.update),
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
                    handler: handleErrors(this.delete),
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
        const dto: ItemDTO = toDTO(request.payload);
        const result = await this.itemService.create(dto);

        return response.response(result).code(201);
    }

    public async update(request: Request, response: ResponseToolkit) {
        const dto: ItemDTO = toDTO(request.payload);
        const result = await this.itemService.update(dto);

        return response.response(result).code(200);
    }

    public async delete(request: Request, response: ResponseToolkit) {
        const { params: { id }} = request;
        await this.itemService.delete(Number(id));
        
        return response.response().code(204);
    }
};