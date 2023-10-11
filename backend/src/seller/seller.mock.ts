export const sellersInMock = [
  {
    id: 'SELLER 1',
    balance: 0,
    transactions: [],
  },
  {
    id: 'SELLER 2',
    balance: 0,
    transactions: [],
  },
];

export const mockSellerService = {
  create: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  update: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  findAll: jest.fn(() => {
    return sellersInMock;
  }),
  findOne: jest.fn(() => {
    return sellersInMock[0];
  }),
};

export const mockSellerRepository = {
  create: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  update: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  findAll: jest.fn(() => {
    return sellersInMock;
  }),
  findOne: jest.fn(() => {
    return sellersInMock[0];
  }),
};
