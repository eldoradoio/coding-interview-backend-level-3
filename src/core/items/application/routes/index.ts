import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { 
    FindItemsController
} from '../controllers/itemController.ts';

export const RoutesItems: ServerRoute<ReqRefDefaults>[] = [
    {
        method: 'GET',
        path: '/items',
        handler: FindItemsController
    }
];