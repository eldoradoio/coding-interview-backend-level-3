import { z } from 'zod';


/**
 * 2.2. Update item schema (allow partial updates).
 */
export const zod_updateItemSchema = z.object({
    // Si `name` está presente, que no sea vacío
    name: z.string().min(1, 'Name is required').optional(),
    // Si `price` está presente, que no sea negativo
    // La prueba requiere el mensaje "Field \"price\" cannot be negative"
    price: z
        .number()
        .nonnegative('Field "price" cannot be negative')
        .optional(),
});


export const zod_createItemSchema = z.object({
    name: z.string({
        required_error: 'Field "name" is required'
    })
        .nonempty('Name is required'),

    price: z.number({
        // Aquí forzamos el mensaje cuando el campo está ausente
        required_error: 'Field "price" is required'
    })
        // Aquí forzamos el mensaje cuando el campo está presente pero es negativo
        .nonnegative('Field "price" cannot be negative'),
});