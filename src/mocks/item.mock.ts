import { faker } from "@faker-js/faker";

export function createRandomItem(id: number) {
  return {
    id,
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 1, max: 1000 }),
  };
}

export class ItemMock {
  items: any[];
  currentId: number;

  constructor() {
    this.items = [];
    this.currentId = 1;
  }

  createItem() {
    const newItem = createRandomItem(this.currentId++);
    this.items.push(newItem);
    return newItem;
  }
}
