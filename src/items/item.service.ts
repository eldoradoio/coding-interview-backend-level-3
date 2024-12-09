import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
  ];

  findAll() {
    return this.items;
  }

  async findOne(id: number) {
    return this.items.find((item) => item.id === id);
  }

  create(item: { name: string; price: number }) {
    const newItem = { id: this.items.length + 1, ...item };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updatedItem: { name: string; price: number }) {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) return null;
    this.items[itemIndex] = { ...this.items[itemIndex], ...updatedItem };
    return this.items[itemIndex];
  }

  delete(id: number) {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) return null;
    return this.items.splice(itemIndex, 1);
  }
}
