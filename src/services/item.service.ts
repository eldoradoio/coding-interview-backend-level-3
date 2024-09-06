import { Item, IItem, getNextSequence } from "../models/item.model";

export class ItemService {
  async getAllItems(): Promise<IItem[]> {
    return Item.find().select("-_id -__v").lean();
  }

  async getItemById(id: number): Promise<IItem | null> {
    return Item.findOne({ id }).select("-_id -__v").lean();
  }

  async getItemsPaginated(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc"
  ): Promise<{
    items: IItem[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage?: number;
    previousPage?: number;
  }> {
    try {
      const pageNum = Math.max(1, Number(page));
      const limitNum = Math.min(25, Math.max(1, Number(limit)));

      const skip = (pageNum - 1) * limitNum;

      const validSortFields = ["id", "name", "price"];
      const sortField = validSortFields.includes(sort) ? sort : "id";

      const totalItems = await Item.countDocuments();

      const items = await Item.find()
        .sort({ [sortField]: order })
        .skip(skip)
        .limit(limitNum)
        .select("-_id -__v")
        .lean();

      const totalPages = Math.ceil(totalItems / limitNum);

      const hasNextPage = pageNum < totalPages;
      const hasPreviousPage = pageNum > 1;

      return {
        items,
        totalItems,
        totalPages,
        currentPage: pageNum,
        hasNextPage,
        hasPreviousPage,
        nextPage: hasNextPage ? pageNum + 1 : undefined,
        previousPage: hasPreviousPage ? pageNum - 1 : undefined,
      };
    } catch (error) {
      console.error("Error in getItemsPaginated:", error);
      throw new Error("Failed to fetch paginated items");
    }
  }

  async createItem(name: string, price: number): Promise<IItem> {
    const id = await getNextSequence("itemId");
    const newItem = new Item({ id, name, price });
    await newItem.save();
    return newItem.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    });
  }

  async updateItem(
    id: number,
    name: string,
    price: number
  ): Promise<IItem | null> {
    const updatedItem = await Item.findOneAndUpdate(
      { id },
      { name, price },
      { new: true }
    )
      .select("-_id -__v")
      .lean();
    return updatedItem;
  }

  async deleteItem(id: number): Promise<boolean> {
    const result = await Item.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
