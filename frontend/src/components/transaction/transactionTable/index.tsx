import { Transaction } from "@/models/transaction";
import { getHumanRedableType } from "@/utils/transaction/getHumanRedableType";
import "./styles.css";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

interface transactionTableProps {
  data?: Transaction[];
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  mutate?: KeyedMutator<Transaction[]>;
}

export default function TransactionTable(props: transactionTableProps) {
  if (!props.data) return "Loading transactions";

  const hasPreviousPage = props.page && props.page >= 2;
  const canNextPage = props.data?.length != 0 && props.data?.length == 10;

  const previousPage = () => {
    if (hasPreviousPage && props.page && props.setPage && props.mutate) {
      props.setPage(props.page - 1);
      props.mutate();
    }
  };

  const nextPage = () => {
    if (canNextPage && props.page && props.setPage && props.mutate) {
      props.setPage(props.page + 1);
      props.mutate();
    }
  };

  return (
    <div className="transactions mt-2">
      {props.page && props.setPage && props.mutate && (
        <nav className="pageControls">
          <button
            className="pageControl"
            onClick={previousPage}
            disabled={!hasPreviousPage}
          >
            Previous page
          </button>
          <button
            className="pageControl"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Next page
          </button>
        </nav>
      )}

      {props.data.length != 0 ? (
        <table className="transactionsTable mt-2">
          <thead>
            <tr>
              <th>Type</th>
              <th>Product</th>
              <th>Value</th>
              <th>Seller</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((transaction: Transaction, key: number) => {
              return (
                <tr key={key}>
                  {transaction.type == 3 ? (
                    <td className="typeMinus transactionType">
                      {getHumanRedableType(transaction.type)}
                    </td>
                  ) : (
                    <td className="typePlus transactionType">
                      {getHumanRedableType(transaction.type)}
                    </td>
                  )}
                  <td className="transactionProduct">{transaction.product}</td>
                  <td className="transactionValue">
                    {transaction.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="sellerId transactionSellerId">
                    <Link href={`/seller/${transaction.sellerId}`}>
                      {transaction.sellerId}
                    </Link>
                  </td>
                  <td className="transactionDate">
                    {new Date(transaction.date).toLocaleString("pt-BR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>There is no transactions history.</h1>
      )}
    </div>
  );
}
