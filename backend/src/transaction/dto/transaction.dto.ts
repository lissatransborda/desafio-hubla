import { IsDate, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDTO {
  id?: string;

  @IsIn([1, 2, 3, 4])
  type: number;

  @IsDate()
  date: Date;

  @IsNotEmpty()
  product: string;

  @IsNumber()
  value: number;

  @IsNotEmpty()
  sellerId: string;

  constructor(
    type: number,
    date: Date,
    product: string,
    value: number,
    sellerId: string,
  ) {
    this.type = type;
    this.date = date;
    this.product = product;
    this.value = value;
    this.sellerId = sellerId;
  }
}
