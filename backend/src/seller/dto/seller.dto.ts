export class SellerDTO {
  id: string;
  balance: number;

  constructor(id: string, balance: number) {
    this.id = id;
    this.balance = balance;
  }
}
