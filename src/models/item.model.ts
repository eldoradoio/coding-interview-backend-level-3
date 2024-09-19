import mongoose, { Schema, Document, Connection } from "mongoose";

export interface IItem extends Document {
  id: number;
  name: string;
  price: number;
}

const ItemSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

export const createItemModel = (connection: Connection) => connection.model<IItem>('Item', ItemSchema);

interface ICounter extends Document {
  _id: string;
  seq: number;
}

const CounterSchema: Schema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const createCounterModel = (connection: Connection) => connection.model<ICounter>("Counter", CounterSchema);

export async function getNextSequence(name: string, connection: Connection): Promise<number> {
  console.log("11");
  const Counter = createCounterModel(connection);
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  console.log("12", counter);
  if (!counter) {
    throw new Error("Failed to generate sequence");
  }

  return counter.seq;
}
