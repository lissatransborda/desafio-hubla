"use client";
import { fetcher } from "@/utils/api/fetcher";
import "./styles.css";
import useSWR, { SWRResponse } from "swr";
import { Seller } from "@/models/seller";
import SellerTable from "@/components/seller/sellerTable";
import { useState } from "react";

export default function SellerPage() {
  const [page, setPage] = useState<number>(1);

  const {
    data: sellers,
    mutate,
    error,
  }: SWRResponse<Seller[]> = useSWR(`seller?page=${page}`, fetcher);

  if (error) return <div>Seller failed to load</div>;

  return (
    <main className="my-8 ml-8">
      <div className="sellersHeader flex flex-row justify-between">
        <h1 className="text-2xl">Sellers</h1>
      </div>
      <SellerTable
        data={sellers}
        page={page}
        setPage={setPage}
        mutate={mutate}
      />
    </main>
  );
}
