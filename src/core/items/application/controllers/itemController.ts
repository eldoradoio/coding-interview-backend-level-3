import { Request, ReqRefDefaults, ResponseToolkit } from '@hapi/hapi';
import { db } from '../../../../infraestructure/dbSequelize.ts';
import { initModels } from '../../../../models/init-models.ts';
import { 
    FindItemByIdUseCase,
    FindItemsUseCase,
    CreateItemUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase
} from '../../domain/index.ts';

const { item } = initModels(db);

export const FindItemsController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const findItemsUseCase = new FindItemsUseCase(item);
        const res = await findItemsUseCase.execute();
        return {
            ok: true,
            statusCode: 200, 
            result: res,
        };
    } catch (error) {
        return {
            ok: false,
            msg: 'Unexpected error'
        }
    }
}

export const FindItemByIdController  = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const findItemByIdUseCase = new FindItemByIdUseCase(item);
        const res = await findItemByIdUseCase.execute(req.params.id);
        return {
            ok: true,
            statusCode: 200, 
            result: res,
        };
    } catch (error) {
        return {
            ok: false,
            msg: 'Unexpected error'
        }
    }
}

export const CreateItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const createItemUseCase = new CreateItemUseCase();
        const res = await createItemUseCase.execute(req.payload);
        return {
            ok: true,
            statusCode: 200, 
            result: res,
        };
    } catch (error) {
        return {
            ok: false,
            msg: 'Unexpected error'
        }
    }   
}


export const UpdateItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const updateItemUseCase = new UpdateItemUseCase();
        const res = await updateItemUseCase.execute(req.payload);
        return {
            ok: true,
            statusCode: 200, 
            result: res,
        };
    } catch (error) {
        return {
            ok: false,
            msg: 'Unexpected error'
        }
    }   
}

export const DeleteItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const deleteItemUseCase = new DeleteItemUseCase();
        const res = await deleteItemUseCase.execute(req.params.id);
        return {
            ok: true,
            statusCode: 200, 
            result: res,
        };
    } catch (error) {
        return {
            ok: false,
            msg: 'Unexpected error'
        }
    }   
}