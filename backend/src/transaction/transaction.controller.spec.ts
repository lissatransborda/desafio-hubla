import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { SellerService } from '../seller/seller.service';
import { streamBufferToMulterFile } from '../utils/streamBufferToMulterFile';
import { mockTransactionService, transactionsInMock } from './__mocks__/transaction';
import { mockSellerService, sellersInMock } from '../seller/__mocks__/seller';

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

    expect(await controller.create(fileToUpload)).toBeUndefined();
  });

  it('should get all transactions', async () => {
    expect(await controller.findAll()).toBe(transactionsInMock);
  });

  it('should get all transactions by sellerId', async () => {
    expect(await controller.findAll(sellersInMock[0].id)).toStrictEqual(
      transactionsInMock,
    );
  });

  it('should get one transaction', async () => {
    expect(await controller.findOne(transactionsInMock[0].id)).toBe(
      transactionsInMock[0],
    );
  });
});
