import { Seller } from "@/models/seller";
import "./styles.css";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

interface sellerTableProps {
  data?: Seller[];
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  mutate?: KeyedMutator<Seller[]>;
}

export default function SellerTable(props: sellerTableProps) {
  if (!props.data) return "Loading sellers";

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
    <div className="sellers mt-2">
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
        <table className="sellersTable mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Number of transactions</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((seller: Seller, key: number) => {
              return (
                <tr key={key}>
                  <td className="sellerId">
                    <Link href={`/seller/${seller.id}`}>{seller.id}</Link>
                  </td>
                  <td className="sellerBalance">
                    {seller.balance.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="sellerTotalTransactions">
                    {seller.transactions.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>There is no seller history.</h1>
      )}
    </div>
  );
}
