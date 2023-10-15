import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  BadRequestException,
  Query,
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
    if (!file) {
      throw new BadRequestException(
        "The file wasn't received using multpart form data",
      );
    }

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
  }

  @Get()
  async findAll(
    @Query('sellerId') sellerId: string = null,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return await this.transactionService.findAll(
      sellerId,
      Number(page),
      Number(perPage),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionService.findOne(id);
  }
}
