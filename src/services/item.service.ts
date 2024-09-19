import { IItem, getNextSequence } from "../models/item.model";
import { ItemRepository } from "../repositories/item.repository";
import mongoose from "mongoose";

export class ItemService {
  constructor(
    private repositoryA: ItemRepository,
    private repositoryB: ItemRepository,
    private connectionA: mongoose.Connection,
    private connectionB: mongoose.Connection
  ) {}

  private getRepository(id: number): { repository: ItemRepository; connection: mongoose.Connection } {
    return id % 2 === 0 
      ? { repository: this.repositoryA, connection: this.connectionA }
      : { repository: this.repositoryB, connection: this.connectionB };
  }

  async getAllItems(): Promise<IItem[]> {
    const itemsA = await this.repositoryA.findAll();
    const itemsB = await this.repositoryB.findAll();
    // return [...itemsA, ...itemsB].sort((a, b) => a.id - b.id);
    return [...itemsA, ...itemsB];
  }

  async getItemById(id: number): Promise<IItem | null> {
    try { 
      console.log("13");
      return await this.getRepository(id).repository.findById(id);
    } catch (error) {
      console.error(`Error fetching item with id ${id}:`, error);
      throw new Error("Failed to fetch item");
    }
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

      const [itemsA, itemsB, countA, countB] = await Promise.all([
        this.repositoryA.findPaginated(skip, limitNum, sortField, order),
        this.repositoryB.findPaginated(skip, limitNum, sortField, order),
        this.repositoryA.count(),
        this.repositoryB.count()
      ]);

      const items = [...itemsA, ...itemsB].sort((a, b) => 
        order === "asc" ? a[sortField as keyof IItem] - b[sortField as keyof IItem] : b[sortField as keyof IItem] - a[sortField as keyof IItem]
      ).slice(0, limitNum);

      const totalItems = countA + countB;
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
    console.log("06");
    let id: number;
    let retries = 0;
    const maxRetries = 3;
 
    while (retries < maxRetries) {
      id = await getNextSequence("itemId", this.connectionA); // Usamos connectionA para la secuencia
      console.log("07", id);
      const existingItem = await this.getItemById(id);
      console.log("08", existingItem);
      if (!existingItem) {
        console.log("09");
        const { repository } = this.getRepository(id);
        return repository.create({ id, name, price } as IItem);
      }
      retries++;
      console.log("10", retries);
    }

    throw new Error("Failed to generate a unique ID after multiple attempts");
  }

  async updateItem(
    id: number,
    name: string,
    price: number
  ): Promise<IItem | null> {
    return this.getRepository(id).repository.update(id, { name, price });
  }

  async deleteItem(id: number): Promise<boolean> {
    return this.getRepository(id).repository.delete(id);
  }
}
