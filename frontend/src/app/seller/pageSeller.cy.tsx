import React from "react";
import Home from "./page";
import { sellers } from "@/test/mocks/sellers.mock";

describe("<PageSeller />", () => {
  beforeEach(() => {
    cy.intercept("GET", "/seller?page=1", sellers).as(
      "GetSellers",
    );
  });

  it("should have the sellers table", () => {
    cy.mount(<Home />);
    cy.get(".sellers").should("have.length", 1);
  });
});
