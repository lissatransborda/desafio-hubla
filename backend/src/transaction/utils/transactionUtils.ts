import { validate } from 'class-validator';
import { TransactionDTO } from '../dto/transaction.dto';
import { SellerDTO } from 'src/seller/dto/seller.dto';

export function transactionFileToTransactionsDTO(
  transactionFile: string,
): TransactionDTO[] {
  const transactionFileByLines = transactionFile.split('\n');
  const transactions: TransactionDTO[] = [];

  try {
    transactionFileByLines.forEach((line: string) => {
      if (line.trim() != '') {
        const type = parseInt(line.substring(0, 1));
        const date = new Date(line.substring(1, 26));
        const product = line.substring(26, 56).trim();
        const value = parseFloat(line.substring(56, 66)) / 1000;
        const sellerId = line.substring(66);

        transactions.push(
          new TransactionDTO(type, date, product, value, sellerId),
        );
      }
    });

    return transactions;
  } catch (err) {
    return null;
  }
}

export async function validateTransactions(transactions: TransactionDTO[]) {
  const transactionsErrors = [];

  for (const transaction of transactions) {
    const errors = await validate(transaction);
    if (errors.length >= 1) {
      transactionsErrors.push(errors);
    }
  }

  return transactionsErrors;
}

export function getSellersFromTransactions(
  transactions: TransactionDTO[],
): SellerDTO[] {
  const sellers: SellerDTO[] = [];

  transactions.forEach((transaction: TransactionDTO) => {
    const sellerIndex = sellers.findIndex((s) => s.id === transaction.sellerId);
    if (sellerIndex == -1) {
      sellers.push(
        new SellerDTO(
          transaction.sellerId,
          transaction.type == 3 ? -1 * transaction.value : transaction.value,
        ),
      );
    } else {
      sellers[sellerIndex].balance +=
        transaction.type == 3 ? -1 * transaction.value : transaction.value;
    }
  });

  return sellers;
}
