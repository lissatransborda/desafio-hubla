import React, { useState } from "react";
import SellerTable from "./index";
import { sellers } from "@/test/mocks/sellers.mock";

describe("<sellerTable />", () => {
  it("should have the correct number of rows and columns", () => {
    cy.mount(<SellerTable data={sellers} />);
    cy.get("tr").should("have.length", sellers.length + 1);
    cy.get("td").should("have.length", sellers.length * 3);
  });

  it("should have the correct dataset", () => {
    cy.mount(<SellerTable data={sellers} />);

    cy.get(".sellerId").first().should("have.text", sellers[0].id);

    cy.get(".sellerBalance")
      .first()
      .should(
        "have.text",
        sellers[0].balance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      );
    cy.get(".sellerTotalTransactions")
      .first()
      .should("have.text", sellers[0].transactions.length);
  });
});
