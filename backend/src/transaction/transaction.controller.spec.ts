import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { randomUUID } from 'crypto';
import { SellerService } from '../seller/seller.service';
import { streamBufferToMulterFile } from '../utils/streamBufferToMulterFile';
import { mockTransactionService, transactionsInMock } from './transaction.mock';
import { mockSellerService } from '../seller/seller.mock';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService, SellerService],
    })
      .overrideProvider(TransactionService)
      .useValue(mockTransactionService)
      .overrideProvider(SellerService)
      .useValue(mockSellerService)
      .compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should create new transactions by a file', async () => {
    const fileToUpload = await streamBufferToMulterFile(
      `${__dirname}/../../sales.txt`,
    );

    expect(await controller.create(fileToUpload)).toBe('OK');
  });

  it('should get all transactions', async () => {
    expect(await controller.findAll()).toBe(transactionsInMock);
  });

  it('should get one transaction', async () => {
    expect(await controller.findOne(randomUUID())).toBe(transactionsInMock[0]);
  });
});
