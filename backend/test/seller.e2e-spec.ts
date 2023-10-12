import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { sellerModule } from '../src/seller/seller.module';
import { SellerRepository } from '../src/seller/seller.repository';
import { mockSellerRepository, sellersInMock } from '../src/seller/seller.mock';
import { randomUUID } from 'crypto';

describe('sellerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [sellerModule],
    })
      .overrideProvider(SellerRepository)
      .useValue(mockSellerRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/seller (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/seller')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(sellersInMock);
      });
  });

  it('/seller/:id (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get(`/seller/${sellersInMock[0].id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(sellersInMock[0]);
      });
  });

  it('/seller/:id (GET) --> 400', () => {
    return request(app.getHttpServer())
      .get(`/seller/${randomUUID()}`)
      .expect(404);
  });
});
