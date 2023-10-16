export const sellersInMock = [
  {
    id: 'SELLER',
    balance: 0,
    transactions: [],
  },
  {
    id: 'ANOTHER SELLER',
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
  findOne: jest.fn((id) => {
    return sellersInMock.find((s) => s.id == id);
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
  findOne: jest.fn((id) => {
    return sellersInMock.find((s) => s.id == id);
  }),
};
