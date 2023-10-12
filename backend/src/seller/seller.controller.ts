import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class sellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  async findAll() {
    return await this.sellerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const seller = await this.sellerService.findOne(id);
    if (!seller) throw new NotFoundException();
    return seller;
  }
}
