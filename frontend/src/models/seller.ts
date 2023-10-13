import { Transaction } from "./transaction";

export interface Seller {
  id: string;
  balance: number;
  transactions: Transaction[];
}
