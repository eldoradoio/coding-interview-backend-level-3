import mongoose from "mongoose";
import { IItem, createItemModel, getNextSequence } from "../models/item.model";

export class ItemRepository {
  private model: mongoose.Model<IItem>;
  private connection: mongoose.Connection;

  constructor(connection: mongoose.Connection) {
    this.model = createItemModel(connection);
    this.connection = connection;
  }

  async findAll(): Promise<IItem[]> {
    return this.model.find().select("-_id -__v").lean();
  }

  async findById(id: number): Promise<IItem | null> {
    return this.model.findOne({ id }).select("-_id -__v").lean();
  }

  async findPaginated(
    skip: number,
    limit: number,
    sortField: string,
    order: "asc" | "desc"
  ): Promise<IItem[]> {
    const sortOption: { [key: string]: 1 | -1 } = {
      [sortField]: order === "asc" ? 1 : -1,
    };
    return this.model
      .find()
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select("-_id -__v")
      .lean();
  }

  async count(): Promise<number> {
    return this.model.countDocuments();
  }

  async getNextSequence(sequenceName: string): Promise<number> {
    return getNextSequence(sequenceName, this.connection);
  }

  async create(item: Omit<IItem, "id">): Promise<IItem> {
    const newItem = new this.model(item);
    await newItem.save();
    return newItem.toObject({
      versionKey: false,
      transform: (doc: any, ret: any) => {
        delete ret._id;
      },
    });
  }

  async update(id: number, item: Partial<IItem>): Promise<IItem | null> {
    return this.model
      .findOneAndUpdate({ id }, item, { new: true })
      .select("-_id -__v")
      .lean();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.model.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
