import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { sellerController } from './seller.controller';
import { PrismaService } from 'src/database/prisma.service';
import { SellerRepository } from './seller.repository';

@Module({
  controllers: [sellerController],
  providers: [SellerService, SellerRepository, PrismaService],
})
export class sellerModule {}
