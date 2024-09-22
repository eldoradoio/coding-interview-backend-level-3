import { Server } from "@hapi/hapi";
import { initializeServer } from "../src/server";

describe("Parameter Validations", () => {
  let server: Server;
  beforeEach(async () => {
    server = await initializeServer();
  });
  it("should return 400 for invalid ID format in URL parameter", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/items/99ddd",
    });
    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      message: "Invalid ID format.",
      param: "99ddd",
    });
  });
  afterAll(() => {
    return server.stop();
  });
});
