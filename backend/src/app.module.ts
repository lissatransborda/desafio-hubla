import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [TransactionModule, SellerModule],
})
export class AppModule {}
