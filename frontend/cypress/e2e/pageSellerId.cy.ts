/// <reference types="cypress" />

import { getHumanType } from "../../src/utils/transaction/getHumanType";
import { transactions } from "../../src/test/mocks/transactions.mock";
import { sellers } from "../../src/test/mocks/sellers.mock";

describe("PageHome", () => {
  beforeEach(() => {
    cy.visit("/seller/SELLER");

    cy.intercept("GET", "/transaction?sellerId=SELLER&page=1", transactions).as(
      "GetTransactions",
    );
    cy.intercept("GET", "/seller/SELLER", sellers[0]).as("GetSeller");
  });

  it("should have the correct dataset", () => {
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

  it("should have the seller balance", () => {
    cy.get(".sellerBalance")
      .first()
      .should(
        "have.text",
        sellers[0].balance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      );
  });
});
