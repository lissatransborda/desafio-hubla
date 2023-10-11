import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SellerDTO } from './dto/seller.dto';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async create(sellerDTO: SellerDTO) {
    return await this.prisma.seller.create({ data: sellerDTO });
  }

  async update(sellerDTO: SellerDTO) {
    return await this.prisma.seller.update({
      data: sellerDTO,
      where: { id: sellerDTO.id },
    });
  }

  async findAll() {
    return await this.prisma.seller.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.seller.findUnique({ where: { id } });
  }
}
