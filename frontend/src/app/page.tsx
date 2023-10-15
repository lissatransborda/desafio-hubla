"use client";
import { fetcher } from "@/utils/api/fetcher";
import TransactionTable from "../components/transaction/transactionTable";
import "./styles.css";
import useSWR, { SWRResponse } from "swr";
import { postTransactionFile } from "@/utils/api/postTransactionFile";
import Swal from "sweetalert2";
import { Transaction } from "@/models/transaction";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(1);

  const {
    data: transactions,
    mutate,
    error,
  }: SWRResponse<Transaction[]> = useSWR(`transaction?page=${page}`, fetcher);

  if (error) return <div>Transactions failed to load</div>;

  const handleFileUpload = async (event: any) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const response = await postTransactionFile(formData);
    mutate()

    alertFileResponse(response);
  };

  const alertFileResponse = (response: Response) => {
    if (response.status == 201) {
      Swal.fire({
        icon: "success",
        title: "Transactions Imported",
      });
    } else if (response.status == 400) {
      Swal.fire({
        icon: "error",
        title: "The transactions file is invalid",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Unexpected error",
      });
    }
  };

  return (
    <main className="my-8 ml-8">
      <div className="transactionsHeader flex flex-row justify-between">
        <h1 className="text-2xl">Transactions</h1>
        <span>
          <label className="importTransactionsButton" htmlFor="file">
            Import Transactions
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </span>
      </div>
      <TransactionTable
        data={transactions}
        page={page}
        setPage={setPage}
        mutate={mutate}
      />
    </main>
  );
}
