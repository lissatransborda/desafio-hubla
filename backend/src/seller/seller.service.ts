import { Injectable } from '@nestjs/common';
import { sellerDTO } from './dto/seller.dto';
import { SellerRepository } from './seller.repository';

@Injectable()
export class SellerService {
  constructor(private sellerRepository: SellerRepository) {}

  async create(sellerDTO: sellerDTO) {
    return await this.sellerRepository.create(sellerDTO);
  }

  async update(sellerDTO: sellerDTO) {
    return await this.sellerRepository.update(sellerDTO);
  }

  async findAll(page: number = 1, perPage: number = 10) {
    return await this.sellerRepository.findAll(page, perPage);
  }

  async findOne(id: string) {
    return (await this.sellerRepository.findOne(id)) ?? null;
  }
}
