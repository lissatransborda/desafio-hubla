import { randomUUID } from 'crypto';

export const transactionsInMock = [
  {
    id: randomUUID(),
    type: 1,
    date: new Date().toISOString(),
    product: 'PRODUCT',
    value: 10,
    sellerId: 'SELLER',
  },
  {
    id: randomUUID(),
    type: 2,
    date: new Date().toISOString(),
    product: 'PRODUCT',
    value: 11,
    sellerId: 'SELLER',
  },
];

export const mockTransactionService = {
  create: jest.fn((dto) => {
    return {
      id: randomUUID(),
      ...dto,
    };
  }),
  findAll: jest.fn((sellerId = null) => {
    if (sellerId) {
      return transactionsInMock.filter((t) => t.sellerId == sellerId);
    }
    return transactionsInMock;
  }),

  findOne: jest.fn((id) => {
    return transactionsInMock.find((t) => t.id == id);
  }),
};

export const mockTransactionRepository = {
  create: jest.fn((dto) => {
    return {
      id: randomUUID(),
      ...dto,
    };
  }),
  findAll: jest.fn(() => {
    return transactionsInMock;
  }),

  findAllBySellerId: jest.fn((sellerId) => {
    return transactionsInMock.filter((t) => t.sellerId == sellerId);
  }),

  findOne: jest.fn((id) => {
    return transactionsInMock.find((t) => t.id == id);
  }),
};
