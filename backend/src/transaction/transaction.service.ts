import { Injectable } from '@nestjs/common';
import { TransactionDTO } from './dto/transaction.dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(transactionDTO: TransactionDTO) {
    return await this.transactionRepository.create(transactionDTO);
  }

  async findAll(
    sellerId: string = null,
    page: number = 1,
    perPage: number = 10,
  ) {
    if (sellerId) {
      return await this.transactionRepository.findAllBySellerId(
        sellerId,
        page,
        perPage,
      );
    }
    return await this.transactionRepository.findAll(page, perPage);
  }

  async findOne(id: string) {
    return (await this.transactionRepository.findOne(id)) ?? null;
  }
}
