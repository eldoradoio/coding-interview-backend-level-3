import { Request, ReqRefDefaults, ResponseToolkit } from '@hapi/hapi';
import { HTTPCODES } from '../../../shared/constants/index.ts';
import { 
    IItems,
    IError
} from '../../../shared/interfaces/index.ts'
import { ItemRepositorySequelizeAdapter } from '../out/itemRepositorySequelizeAdapter.ts';
import { 
    FindItemByIdUseCase,
    FindItemsUseCase,
    CreateItemUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase
} from '../../domain/useCases/index.ts';

const itemRepository = new ItemRepositorySequelizeAdapter();

export const FindItemsController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const findItemsUseCase = new FindItemsUseCase(itemRepository);
        const res = await findItemsUseCase.execute();
        return h.response(res).code(HTTPCODES.success);
    } catch (error) {
        const typedError = error as IError;
        return h.response(typedError  || {msg: 'Unexpected error'}).code(typedError.errorCode || 500);
       
    }
}

export const FindItemByIdController  = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const findItemByIdUseCase = new FindItemByIdUseCase(itemRepository);
        const res = await findItemByIdUseCase.execute(req.params.id as number);
        return h.response(res).code(HTTPCODES.success);
    } catch (error) {
        const typedError = error as IError;
        return h.response(typedError  || {msg: 'Unexpected error'}).code(typedError.errorCode || 500);
    }
}

export const CreateItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const createItemUseCase = new CreateItemUseCase(itemRepository);
        const payload = req.payload as IItems
        const res = await createItemUseCase.execute(payload);
        return h.response(res).code(HTTPCODES.successCreate);
    } catch (error) {
        const typedError = error as IError;
        return h.response(typedError  || {msg: 'Unexpected error'}).code(typedError.errorCode || 500);
    }   
}


export const UpdateItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const updateItemUseCase = new UpdateItemUseCase(itemRepository);
        const payload = req.payload as IItems;
        const id = req.params.id as number;
        const res = await updateItemUseCase.execute({ ...payload, id});
        return h.response(res).code(HTTPCODES.success);
    } catch (error) {
        const typedError = error as IError;
        return h.response(typedError  || {msg: 'Unexpected error'}).code(typedError.errorCode || 500);
    }   
}

export const DeleteItemController = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const deleteItemUseCase = new DeleteItemUseCase(itemRepository);
        const res = await deleteItemUseCase.execute(req.params.id);
        return h.response(res).code(HTTPCODES.successDeleted);
    } catch (error) {
        const typedError = error as IError;
        return h.response(typedError  || {msg: 'Unexpected error'}).code(typedError.errorCode || 500);
    }   
}