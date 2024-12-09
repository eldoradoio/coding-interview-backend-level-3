import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a response with status code 200 for /ping', async () => {
    const response = await request(app.getHttpServer())
      .get('/ping')
      .expect(200);
    expect(response.body).toEqual({ ok: true });
  });

  describe('Basic Items functionality', () => {
    it('should be able to list all items', async () => {
      const response = await request(app.getHttpServer())
        .get('/items')
        .expect(200);
      expect(response.body).toEqual([]);

      await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: 10 })
        .expect(201);

      const response2 = await request(app.getHttpServer())
        .get('/items')
        .expect(200);
      expect(response2.body).toEqual([
        { id: expect.any(Number), name: 'Item 1', price: 10 },
      ]);
    });

    it('should be able to create and retrieve an item by ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: 10 })
        .expect(201);

      expect(createResponse.body).toEqual({
        id: expect.any(Number),
        name: 'Item 1',
        price: 10,
      });

      const getResponse = await request(app.getHttpServer())
        .get(`/items/${createResponse.body.id}`)
        .expect(200);

      expect(getResponse.body).toEqual({
        id: createResponse.body.id,
        name: 'Item 1',
        price: 10,
      });
    });

    it('should be able to update an item', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: 10 })
        .expect(201);

      const updateResponse = await request(app.getHttpServer())
        .put(`/items/${createResponse.body.id}`)
        .send({ name: 'Item 1 updated', price: 20 })
        .expect(200);

      expect(updateResponse.body).toEqual({
        id: createResponse.body.id,
        name: 'Item 1 updated',
        price: 20,
      });

      const getResponse = await request(app.getHttpServer())
        .get(`/items/${createResponse.body.id}`)
        .expect(200);
      expect(getResponse.body).toEqual({
        id: createResponse.body.id,
        name: 'Item 1 updated',
        price: 20,
      });
    });

    it('should be able to delete an item', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: 10 })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/items/${createResponse.body.id}`)
        .expect(204);

      await request(app.getHttpServer())
        .get(`/items/${createResponse.body.id}`)
        .expect(404);
    });
  });

  describe('Validations', () => {
    it('should validate required fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1' })
        .expect(400);

      expect(response.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" is required',
          },
        ],
      });
    });

    it('should not allow for negative pricing for new items', async () => {
      const response = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: -10 })
        .expect(400);

      expect(response.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative',
          },
        ],
      });
    });

    it('should not allow for negative pricing for updated items', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'Item 1', price: 10 })
        .expect(201);

      const updateResponse = await request(app.getHttpServer())
        .put(`/items/${createResponse.body.id}`)
        .send({ name: 'Item 1 updated', price: -20 })
        .expect(400);

      expect(updateResponse.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative',
          },
        ],
      });
    });
  });
});
