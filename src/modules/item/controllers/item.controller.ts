import Joi from "joi";
import { Request, ResponseObject, ResponseToolkit, Server } from '@hapi/hapi';
import { ItemService } from '../services';
import { itemCreationSchema, itemUpdateSchema } from '../schemas';
import { validationPipe } from "../../../pipelines";
import { handleErrors } from "../../../handlers";
import { ItemDTO } from "../dtos";
import { toDTO } from "../utils";

/**
 * Controller for handling item-related requests.
 */
export class ItemController {
    
    /**
     * Creates an instance of ItemController.
     * @param {ItemService} itemService - The service to handle item operations.
     */
    constructor(private readonly itemService: ItemService) {
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Initializes the item controller by setting up routes.
     * @param {Server} server - The Hapi server instance.
     */
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

    /**
     * Handles the request to list all items.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<ResponseObject>} The response object.
     */
    public async list(request: Request, response: ResponseToolkit): Promise<ResponseObject> {
        const result = await this.itemService.list();

        return response.response(result).code(200);
    }

    /**
     * Handles the request to get a specific item by ID.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<ResponseObject>} The response object.
     */
    public async get(request: Request, response: ResponseToolkit): Promise<ResponseObject> {
        const { params: { id }} = request;
        const result = await this.itemService.get(Number(id));

        return response.response(result).code(200);
    }

    /**
     * Handles the request to create a new item.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<ResponseObject>} The response object.
     */
    public async create(request: Request, response: ResponseToolkit): Promise<ResponseObject> {
        const dto: ItemDTO = toDTO(request.payload);
        const result = await this.itemService.create(dto);

        return response.response(result).code(201);
    }

    /**
     * Handles the request to update an existing item.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<ResponseObject>} The response object.
     */
    public async update(request: Request, response: ResponseToolkit): Promise<ResponseObject> {
        const dto: ItemDTO = toDTO(request.payload);
        const result = await this.itemService.update(dto);

        return response.response(result).code(200);
    }

    /**
     * Handles the request to delete an existing item.
     * @param {Request} request - The Hapi request object.
     * @param {ResponseToolkit} response - The Hapi response toolkit.
     * @returns {Promise<ResponseObject>} The response object.
     */
    public async delete(request: Request, response: ResponseToolkit): Promise<ResponseObject> {
        const { params: { id }} = request;
        await this.itemService.delete(Number(id));
        
        return response.response().code(204);
    }
};