import { IItem } from "../models/item.model";
import { ItemRepository } from "../repositories/item.repository";

export class ItemService {
  constructor(
    private repositoryA: ItemRepository,
    private repositoryB: ItemRepository
  ) {}

  private getRepository(id: number): ItemRepository {
    return id % 2 === 0 ? this.repositoryA : this.repositoryB;
  }

  async getAllItems(): Promise<IItem[]> {
    const itemsA = await this.repositoryA.findAll();
    const itemsB = await this.repositoryB.findAll();
    return [...itemsA, ...itemsB].sort((a, b) => a.id - b.id);
  }

  async getItemById(id: number): Promise<IItem | null> {
    return this.getRepository(id).findById(id);
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
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(25, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const validSortFields = ["id", "name", "price"];
    const sortField = validSortFields.includes(sort) ? sort : "id";

    const [itemsA, itemsB, countA, countB] = await Promise.all([
      this.repositoryA.findPaginated(skip, limitNum, sortField, order),
      this.repositoryB.findPaginated(skip, limitNum, sortField, order),
      this.repositoryA.count(),
      this.repositoryB.count(),
    ]);

    const items = [...itemsA, ...itemsB]
      .sort((a, b) =>
        order === "asc"
          ? a[sortField as keyof IItem] - b[sortField as keyof IItem]
          : b[sortField as keyof IItem] - a[sortField as keyof IItem]
      )
      .slice(0, limitNum);

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
  }

  async createItem(name: string, price: number): Promise<IItem> {
    const id = await this.repositoryA.getNextSequence("itemId");

    const repository = this.getRepository(id);

    return repository.create({ id, name, price } as IItem);
  }

  async updateItem(
    id: number,
    name: string,
    price: number
  ): Promise<IItem | null> {
    return this.getRepository(id).update(id, { name, price });
  }

  async deleteItem(id: number): Promise<boolean> {
    return this.getRepository(id).delete(id);
  }
}
