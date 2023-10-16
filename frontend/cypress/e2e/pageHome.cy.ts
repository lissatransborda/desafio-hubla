/// <reference types="cypress" />

import { getHumanRedableType } from "../../src/utils/transaction/getHumanRedableType";
import { transactions } from "../../src/test/mocks/transactions.mock";

describe("PageHome", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "/transaction?page=1", transactions).as(
      "GetTransactions",
    );

    cy.intercept("POST", "/transaction", {
      statusCode: 201,
      body: {},
    }).as("postTransactions");
  });

  it("should have the correct dataset", () => {
    cy.get(".transactionType")
      .first()
      .should("have.text", getHumanRedableType(transactions[0].type));
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

  it("should have a file input", () => {
    cy.get("label[for=file]").selectFile("sales.txt");
  });
});
