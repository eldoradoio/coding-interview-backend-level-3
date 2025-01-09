import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { 
    FindItemByIdController,
    FindItemsController,
    CreateItemController,
    UpdateItemController,
    DeleteItemController
} from '../../adapters/in/itemController.ts';

export const RoutesItems: ServerRoute<ReqRefDefaults>[] = [
    {
        method: 'GET',
        path: '/items/{id}',
        handler: FindItemByIdController
    },
    {
        method: 'GET',
        path: '/items',
        handler: FindItemsController
    },
    {
        method: 'POST',
        path: '/items',
        handler: CreateItemController
    }, {
        method: 'PUT',
        path: '/items/{id}',
        handler: UpdateItemController
    },
    {
        method: 'DELETE',
        path: '/items/{id}',
        handler: DeleteItemController
    }
];