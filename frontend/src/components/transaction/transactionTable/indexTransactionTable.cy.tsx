import React, { useState } from "react";
import TransactionTable from "./index";
import { getHumanType } from "@/utils/transaction/getHumanType";
import { transactions } from "../../../test/mocks/transactions.mock";

describe("<TransactionTable />", () => {
  it("should have the correct number of rows and columns", () => {
    cy.mount(<TransactionTable data={transactions} />);
    cy.get("tr").should("have.length", transactions.length + 1);
    cy.get("td").should("have.length", transactions.length * 5);
  });

  it("should have the correct dataset", () => {
    cy.mount(<TransactionTable data={transactions} />);

    cy.get(".transactionType")
      .first()
      .should("have.text", getHumanType(transactions[0].type));

    cy.get(".transactionType")
      .first()
      .should(
        "have.class",
        transactions[0].type == 3 ? "typeMinus" : "typePlus",
      );

    cy.get(".transactionProduct")
      .first()
      .should("have.text", transactions[0].product);

    cy.get(".transactionValue")
      .first()
      .should(
        "have.text",
        transactions[0].value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      );

    cy.get(".transactionSellerId")
      .first()
      .should("have.text", transactions[0].sellerId);

    cy.get(".transactionDate")
      .first()
      .should(
        "have.text",
        new Date(transactions[0].date).toLocaleString("pt-BR"),
      );
  });
});
