"use client";
import { Seller } from "@/models/seller";
import { fetcher } from "@/utils/api/fetcher";
import TransactionTable from "../../../components/transaction/transactionTable";
import useSWR, { SWRResponse } from "swr";
import "./styles.css";
import { Transaction } from "@/models/transaction";
import { useState } from "react";

export default function SellerByIdPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState<number>(1);

  const { data: seller, error: sellerError }: SWRResponse<Seller> = useSWR(
    `seller/${params.id}`,
    fetcher,
  );

  const {
    data: transactions,
    mutate: transactionsMutate,
    error: transactionError,
  }: SWRResponse<Transaction[]> = useSWR(
    `transaction?sellerId=${params.id}&page=${page}`,
    fetcher,
  );

  if (!seller || !transactions) return "Loading";

  if (sellerError || transactionError) return <div>Seller failed to load</div>;

  return (
    <main className="my-8 mx-8">
      <div className="seller">
        <div className="sellerInfo">
          <h1 className="text-2xl">{seller.id}</h1>
          <h1 className="text-xl">
            Total balance:
            <span className="sellerBalance">
              {seller.balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </h1>
        </div>
      </div>

      <TransactionTable
        data={transactions}
        page={page}
        setPage={setPage}
        mutate={transactionsMutate}
      />
    </main>
  );
}
