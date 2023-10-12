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
  findAll: jest.fn(() => {
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
  findOne: jest.fn((id) => {
    return transactionsInMock.find((t) => t.id == id);
  }),
};
