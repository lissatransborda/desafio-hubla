import { Test, TestingModule } from '@nestjs/testing';
import { sellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { mockSellerService, sellersInMock } from './seller.mock';

describe('sellerController', () => {
  let controller: sellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [sellerController],
      providers: [SellerService],
    })
      .overrideProvider(SellerService)
      .useValue(mockSellerService)
      .compile();

    controller = module.get<sellerController>(sellerController);
  });

  it('should get all sellers', async () => {
    expect(await controller.findAll()).toBe(sellersInMock);
  });

  it('should get one seller', async () => {
    expect(await controller.findOne(sellersInMock[0].id)).toBe(
      sellersInMock[0],
    );
  });
});
