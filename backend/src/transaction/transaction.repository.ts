import { Injectable } from '@nestjs/common';
import { TransactionDTO } from './dto/transaction.dto';
import { PrismaService } from '../database/prisma.service';
import { omit } from '../utils/omit';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(transactionDTO: TransactionDTO) {
    const transaction = omit('sellerId', transactionDTO);
    return await this.prisma.transaction.create({
      data: {
        ...transaction,
        seller: { connect: { id: transactionDTO.sellerId } },
      },
    });
  }

  async findAll() {
    return await this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.transaction.findUnique({
      where: { id },
    });
  }
}
