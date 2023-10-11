import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { sellerModule } from './seller/seller.module';

@Module({
  imports: [TransactionModule, sellerModule],
})
export class AppModule {}
