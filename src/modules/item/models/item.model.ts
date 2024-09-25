import { Schema, model, Document } from 'mongoose';

export interface DocumentItem extends Document {
    name: string;
    price: number;
}

const ItemSchema = new Schema<DocumentItem>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

ItemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Item = model<DocumentItem>('Item', ItemSchema);