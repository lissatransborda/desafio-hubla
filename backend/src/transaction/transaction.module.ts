import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../database/prisma.service';
import { SellerService } from 'src/seller/seller.service';
import { TransactionRepository } from './transaction.repository';
import { SellerRepository } from 'src/seller/seller.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    SellerRepository,
    SellerService,
    PrismaService,
  ],
})
export class TransactionModule {}
