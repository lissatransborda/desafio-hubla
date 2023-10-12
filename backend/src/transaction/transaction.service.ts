import { Injectable } from '@nestjs/common';
import { TransactionDTO } from './dto/transaction.dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(transactionDTO: TransactionDTO) {
    return await this.transactionRepository.create(transactionDTO);
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async findOne(id: string) {
    return (await this.transactionRepository.findOne(id)) ?? null;
  }
}
