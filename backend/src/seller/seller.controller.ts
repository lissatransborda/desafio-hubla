import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class sellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return await this.sellerService.findAll(Number(page), Number(perPage));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const seller = await this.sellerService.findOne(id);
    if (!seller) throw new NotFoundException();
    return seller;
  }
}
