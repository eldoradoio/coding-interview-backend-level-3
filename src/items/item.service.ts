import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { IBaseItem } from './items.interface';

@Injectable()
export class ItemsService {
  constructor(@Inject('AWS_POSTGRE') private readonly knex: Knex) {}

  async getAllItems(tableName: string): Promise<IBaseItem[]> {
    return this.knex(tableName).select('*');
  }

  async getItemById(tableName: string, id: number): Promise<IBaseItem> {
    this.validateId(id);
    const item = await this.knex(tableName).where({ id }).first();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async createItem(tableName: string, item: IBaseItem): Promise<IBaseItem> {
    this.validateItemFields(item);

    const [newItem] = await this.knex(tableName).insert(item).returning('*');
    return newItem;
  }

  async updateItem(
    tableName: string,
    id: number,
    updatedItem: IBaseItem,
  ): Promise<IBaseItem> {
    this.validateId(id);
    this.validateItemFields(updatedItem);

    const [updated] = await this.knex(tableName)
      .where({ id })
      .update(updatedItem)
      .returning('*');
    if (!updated) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updated;
  }

  async deleteItem(
    tableName: string,
    id: number,
  ): Promise<{ message: string }> {
    this.validateId(id);

    const deletedRows = await this.knex(tableName).where({ id }).delete();
    if (deletedRows === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return { message: 'Item deleted successfully' };
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('ID must be a positive integer');
    }
  }

  private validateItemFields(item: IBaseItem): void {
    const errors: { field: string; message: string }[] = [];

    if (!item.name || typeof item.name !== 'string') {
      errors.push({ field: 'name', message: 'Field "name" is required' });
    }

    if (
      item.price === undefined ||
      typeof item.price !== 'number' ||
      item.price < 0
    ) {
      errors.push({
        field: 'price',
        message:
          item.price === undefined
            ? 'Field "price" is required'
            : 'Field "price" cannot be negative',
      });
    }

    if (
      item.stock !== undefined &&
      (typeof item.stock !== 'number' || item.stock < 0)
    ) {
      errors.push({
        field: 'stock',
        message: 'Field "stock" must be a non-negative number',
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException({ errors });
    }
  }
}
