import React from "react";
import Home from "./page";
import { transactions } from "@/test/mocks/transactions.mock";

describe("<Home />", () => {
  beforeEach(() => {
    cy.intercept("GET", "/transaction?page=1", transactions).as(
      "GetTransactions",
    );
    cy.intercept("POST", "/transaction", {
      statusCode: 201,
      body: {},
    }).as("postTransactions");
  });

  it("should have a file input", () => {
    cy.mount(<Home />);
    cy.get("label[for=file]").selectFile("sales.txt");
  });

  it("should have the transactions table", () => {
    cy.mount(<Home />);
    cy.get(".transactions").should("have.length", 1);
  });
});
