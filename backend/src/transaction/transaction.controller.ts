import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  getsellersFromTransactions,
  transactionFileToTransactionsDTO,
  validateTransactions,
} from './utils/transactionUtils';
import { SellerService } from '../seller/seller.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly sellerService: SellerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      const transactionFile = file.buffer.toString();

      const transactionsDTO = transactionFileToTransactionsDTO(transactionFile);

      if ((await validateTransactions(transactionsDTO)).length >= 1) {
        throw new BadRequestException("The file isn't valid");
      }

      const sellers = getsellersFromTransactions(transactionsDTO);

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

      return;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new BadRequestException("There isn't file");
      }

      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll() {
    return await this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionService.findOne(id);
    if (!transaction) throw new NotFoundException();
    return transaction;
  }
}
