import Joi from 'joi';

export const errorManager =  (schema: Joi.ObjectSchema<any>, data: any) =>  {
    const { error } = schema.validate(data);
    if (error && error?.details?.length > 0) {
        return error.details.map((error) => {
            return {
                field: error.path[0],
                message: error.message
            }
        });
    }
}