import { Server } from "@hapi/hapi";
import { initializeServer } from "../src/server";

describe('E2E Tests', () => {
    let server: Server;
    beforeEach(async () => {
        server = await initializeServer();
    });
    it("should return 404 for an unknown route", async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/unknown-route'
        });

        expect(response.statusCode).toBe(404);
        expect(response.result).toEqual({
            statusCode: 404,
            error: 'Not Found',
            message: "The requested resource /unknown-route could not be found."
        });
    });    
    afterAll(() => {
        return server.stop();
    });
});
