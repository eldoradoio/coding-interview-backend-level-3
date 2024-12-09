import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Iitems } from './items.interface';

const FAKEITEMS: Iitems[] = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 200 },
  { id: 3, name: 'Item 2', price: 200 },
  { id: 4, name: 'Item 2', price: 200 },
  { id: 5, name: 'Item 2', price: 200 },
  { id: 6, name: 'Item 2', price: 200 },
  { id: 7, name: 'Item 2', price: 200 },
];

const FAKEITEMS_EMPTY: Iitems[] = [];

@Injectable()
export class ItemsService {
  private items: Iitems[] = FAKEITEMS_EMPTY;

  async getAllItem(): Promise<Iitems[]> {
    try {
      return Promise.resolve(this.items);
    } catch (error: any) {
      console.log('Error in findAll:', error.message || error);
      throw new Error('Unexpected error occurred in findAll');
    }
  }

  async getByIdItem(id: number): Promise<Iitems> {
    try {
      this.validateId(id);
      const item = this.items.find((item) => item.id === id);
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return Promise.resolve(item);
    } catch (error: any) {
      console.log('Error in findOne:', error.message || error);
      throw error;
    }
  }

  async createItem(item: Iitems): Promise<Iitems> {
    try {
      this.validateItemFields(item);
      const newItem: Iitems = {
        ...item,
        id: this.generateId(),
      };
      this.items.push(newItem);
      return newItem;
    } catch (error: any) {
      console.log('Error in create:', error.message || error);
      throw error;
    }
  }

  async updateItem(id: number, updatedItem: Iitems): Promise<Iitems> {
    try {
      this.validateId(id);
      this.validateItemFields(updatedItem);

      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex === -1) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      this.items[itemIndex] = { ...this.items[itemIndex], ...updatedItem };
      return this.items[itemIndex];
    } catch (error: any) {
      console.log('Error in update:', error.message || error);
      throw error;
    }
  }

  async deleteItem(id: number): Promise<{ message: string }> {
    try {
      this.validateId(id);

      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex === -1) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      this.items.splice(itemIndex, 1);
      return { message: 'Item deleted successfully' };
    } catch (error: any) {
      console.log('Error in delete:', error.message || error);
      throw error;
    }
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('ID must be a positive integer');
    }
  }

  private validateItemFields(item: Iitems): void {
    const errors = [];

    if (!item.name || typeof item.name !== 'string') {
      errors.push({
        field: 'name',
        message: 'Field "name" is required and must be a string',
      });
    }

    if (
      item.price === undefined ||
      typeof item.price !== 'number' ||
      item.price < 0
    ) {
      const message =
        item.price === undefined
          ? 'Field "price" is required'
          : 'Field "price" cannot be negative';
      errors.push({
        field: 'price',
        message,
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException({ errors });
    }
  }

  private generateId(): number {
    return this.items.length > 0
      ? Math.max(...this.items.map((item) => item.id)) + 1
      : 1;
  }
}
