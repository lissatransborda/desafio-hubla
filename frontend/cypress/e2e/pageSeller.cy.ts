/// <reference types="cypress" />

import { sellers } from "../../src/test/mocks/sellers.mock";
import { transactions } from "../../src/test/mocks/transactions.mock";

describe("PageHome", () => {
  beforeEach(() => {
    cy.visit("/seller");

    cy.intercept("GET", "/seller?page=1", sellers).as("GetSellers");
    cy.intercept("GET", "/transaction?page=1", transactions).as(
      "GetTransactions",
    );
  });

  it("should have the correct dataset", () => {
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
