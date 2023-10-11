import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  getSellersFromTransactions,
  transactionFileToTransactionsDTO,
  validateTransactions,
} from './utils/transactionUtils';
import { SellerService } from 'src/seller/seller.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly sellerService: SellerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const transactionFile = file.buffer.toString();

    const transactionsDTO = transactionFileToTransactionsDTO(transactionFile);

    if ((await validateTransactions(transactionsDTO)).length >= 1) {
      throw new BadRequestException("The file isn't valid");
    }

    const sellers = getSellersFromTransactions(transactionsDTO);

    for (const seller of sellers) {
      const sellerDB = await this.sellerService.findOne(seller.id);
      if (sellerDB == null) {
        await this.sellerService.create(seller);
      } else {
        seller.balance += sellerDB.balance;
        await this.sellerService.update(seller);
      }
    }

    for (const transaction of transactionsDTO) {
      await this.transactionService.create(transaction);
    }

    return 'OK';
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
