import { Request, ReqRefDefaults, ResponseToolkit } from '@hapi/hapi';
import { db } from '../../../../infraestructure/dbSequelize.ts';
import { initModels } from '../../../../models/init-models.ts'
import { FindItemByIdUseCase } from '../../domain/findItemByIdUseCase.ts';

const { item } = initModels(db);

export const FindItemsController  = async (req: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) => {
    try {
        const findItemByIdUseCase = new FindItemByIdUseCase(item);
        const res = await findItemByIdUseCase.execute();
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