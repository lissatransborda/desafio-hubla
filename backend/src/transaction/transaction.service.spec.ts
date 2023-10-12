import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import {
  mockTransactionRepository,
  transactionsInMock,
} from './transaction.mock';
import { randomUUID } from 'crypto';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, TransactionRepository],
    })
      .overrideProvider(TransactionRepository)
      .useValue(mockTransactionRepository)
      .compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should create one transaction', async () => {
    const transaction = {
      id: randomUUID(),
      type: 1,
      date: new Date(),
      product: 'PRODUCT',
      value: 0,
      sellerId: 'SELLER',
    };

    expect(await service.create(transaction)).toStrictEqual(transaction);
  });

  it('should get all transactions', async () => {
    expect(await service.findAll()).toBe(transactionsInMock);
  });

  it('should get one transaction', async () => {
    expect(await service.findOne(transactionsInMock[0].id)).toBe(
      transactionsInMock[0],
    );
  });

  it('should get no transaction', async () => {
    expect(await service.findOne(randomUUID())).toBe(null);
  });
});
