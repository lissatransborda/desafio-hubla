import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionModule } from '../src/transaction/transaction.module';
import { TransactionRepository } from '../src/transaction/transaction.repository';
import {
  mockTransactionRepository,
  transactionsInMock,
} from '../src/transaction/__mocks__/transaction';
import { SellerRepository } from '../src/seller/seller.repository';
import { mockSellerRepository } from '../src/seller/__mocks__/seller';
import { randomUUID } from 'crypto';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionModule],
    })
      .overrideProvider(TransactionRepository)
      .useValue(mockTransactionRepository)
      .overrideProvider(SellerRepository)
      .useValue(mockSellerRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/transaction (POST) --> 200 OK', async () => {
    return request(app.getHttpServer())
      .post('/transaction')
      .attach('file', `${__dirname}/../sales.txt`)
      .set('Content-Type', 'multipart/form-data')
      .expect(201);
  });

  it('/transaction (POST) --> 400', async () => {
    return request(app.getHttpServer()).post('/transaction').expect(400);
  });

  it('/transaction (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/transaction')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(transactionsInMock);
      });
  });

  it('/transaction?seller=SELLER (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/transaction?seller=SELLER')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(transactionsInMock);
      });
  });

  it('/transaction?seller=NOSELLER (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/transaction?sellerId=NOSELLER')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  it('/transaction/:id (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get(`/transaction/${transactionsInMock[0].id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(transactionsInMock[0]);
      });
  });

  it('/transaction/:id (GET) --> 400', () => {
    return request(app.getHttpServer())
      .get(`/transaction/${randomUUID()}`)
      .expect(404);
  });
});
