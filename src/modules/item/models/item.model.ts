import { Schema, model, Document, Model } from 'mongoose';
import { Counter } from './counter.model';

/**
 * Schema for validating item update requests.
 * @type {Joi.ObjectSchema}
 * @property {string} name - The name of the item. It is required.
 * @property {number} price - The price of the item. It must be greater than 0 and is required.
 */
export interface DocumentItem extends Document {
    name: string;
    price: number;
    id: number;
}

/**
 * Mongoose schema for the Item model.
 * @type {Schema<DocumentItem>}
 * @property {number} id - The unique identifier for the item.
 * @property {string} name - The name of the item. It is required.
 * @property {number} price - The price of the item. It is required.
 */
const ItemSchema: Schema<DocumentItem> = new Schema<DocumentItem>({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

/**
 * Pre-save hook to auto-increment the item ID.
 * @param {Function} next - The next middleware function in the stack.
 */
ItemSchema.pre<DocumentItem>('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'itemId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = counter!.seq;
    }
    next();
});

ItemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

/**
 * Mongoose model for the Item schema.
 * @type {Model<DocumentItem>}
 */
export const Item: Model<DocumentItem> = model<DocumentItem>('Item', ItemSchema);