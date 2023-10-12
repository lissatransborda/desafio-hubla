import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { SellerRepository } from './seller.repository';
import { mockSellerRepository, sellersInMock } from './seller.mock';
import { randomUUID } from 'crypto';

describe('sellerService', () => {
  let service: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerService, SellerRepository],
    })
      .overrideProvider(SellerRepository)
      .useValue(mockSellerRepository)
      .compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should create one seller', async () => {
    const seller = {
      id: 'SELLER',
      balance: 0,
    };

    expect(await service.create(seller)).toStrictEqual(seller);
  });

  it('should update one seller', async () => {
    const seller = {
      id: 'SELLER',
      balance: 0,
    };

    expect(await service.update(seller)).toStrictEqual(seller);
  });

  it('should get all sellers', async () => {
    expect(await service.findAll()).toBe(sellersInMock);
  });

  it('should get one seller', async () => {
    expect(await service.findOne(sellersInMock[0].id)).toBe(sellersInMock[0]);
  });

  it('should get no seller', async () => {
    expect(await service.findOne(randomUUID())).toBe(null);
  });
});
