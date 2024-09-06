import { initializeServer } from "../src/server";
import { Server } from "@hapi/hapi";
import { ItemMock } from "../src/mocks/item.mock";
import { Item } from "../src/models/item.model";

let server: Server;
let itemMock: ItemMock;

beforeEach(async () => {
  server = await initializeServer();
});

describe("Items Pagination E2E Tests", () => {
  beforeEach(async () => {
    itemMock = new ItemMock();
    const items = Array.from({ length: 50 }, () => itemMock.createItem());
    await Item.insertMany(items);
  });

  afterEach(async () => {
    await Item.deleteMany({});
  });

  it("should return paginated items with default parameters", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated",
    });

    expect(response.statusCode).toBe(200);
    const result = JSON.parse(response.payload);
    expect(result.items.length).toBe(10); 
    expect(result.totalItems).toBe(50);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(5);
  });

  it("should return paginated items with custom parameters", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated?page=2&limit=15&sort=price&order=desc",
    });

    expect(response.statusCode).toBe(200);
    const result = JSON.parse(response.payload);
    expect(result.items.length).toBe(15);
    expect(result.totalItems).toBe(50);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(4);

    for (let i = 1; i < result.items.length; i++) {
      expect(result.items[i - 1].price).toBeGreaterThanOrEqual(
        result.items[i].price
      );
    }
  });

  it("should return an error for invalid page number", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated?page=0",
    });

    expect(response.statusCode).toBe(400);
    const result = JSON.parse(response.payload);
    expect(result.errors).toContainEqual({
      field: "page",
      message: '"page" debe ser mayor o igual a 1',
    });
  });

  it("should return an error for invalid limit", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated?limit=30",
    });

    expect(response.statusCode).toBe(400);
    const result = JSON.parse(response.payload);
    expect(result.errors).toContainEqual({
      field: "limit",
      message: '"limit" no puede ser mayor que 25',
    });
  });

  it("should return an error for invalid sort field", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated?sort=invalid",
    });

    expect(response.statusCode).toBe(400);
    const result = JSON.parse(response.payload);
    expect(result.errors).toContainEqual({
      field: "sort",
      message: '"sort" debe ser uno de los siguientes valores: id, name, price',
    });
  });

  it("should return an error for invalid order", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/paginated?order=invalid",
    });

    expect(response.statusCode).toBe(400);
    const result = JSON.parse(response.payload);
    expect(result.errors).toContainEqual({
      field: "order",
      message: '"order" debe ser "asc" o "desc"',
    });
  });
});
