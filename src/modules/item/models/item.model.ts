import { Schema, model, Document } from 'mongoose';
import { Counter } from './counter.model';

export interface DocumentItem extends Document {
    name: string;
    price: number;
    id: number;
}

const ItemSchema = new Schema<DocumentItem>({
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

export const Item = model<DocumentItem>('Item', ItemSchema);