import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { sellerDTO } from './dto/seller.dto';

@Injectable()
export class SellerRepository {
  constructor(private prisma: PrismaService) {}

  async create(sellerDTO: sellerDTO) {
    return await this.prisma.seller.create({ data: sellerDTO });
  }

  async update(sellerDTO: sellerDTO) {
    return await this.prisma.seller.update({
      data: sellerDTO,
      where: { id: sellerDTO.id },
    });
  }

  async findAll(page: number, perPage: number) {
    return await this.prisma.seller.findMany({
      skip: page > 0 ? perPage * (page - 1) : 0,
      take: perPage,
      include: {
        transactions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.seller.findUnique({
      where: { id },
    });
  }
}
