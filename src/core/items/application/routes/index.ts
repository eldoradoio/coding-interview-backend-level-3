import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { 
    FindItemByIdController,
    FindItemsController,
    CreateItemController,
    UpdateItemController,
    DeleteItemController
} from '../controllers/itemController.ts';

export const RoutesItems: ServerRoute<ReqRefDefaults>[] = [
    {
        method: 'GET',
        path: '/items',
        handler: FindItemsController
    },
    {
        method: 'GET',
        path: '/items/{id}',
        handler: FindItemByIdController
    },
    {
        method: 'POST',
        path: '/items/',
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