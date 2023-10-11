import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../database/prisma.service';
import { SellerService } from 'src/seller/seller.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, SellerService, PrismaService],
})
export class TransactionModule {}
