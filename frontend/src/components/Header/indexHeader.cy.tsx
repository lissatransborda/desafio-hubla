import React from "react";
import Header from "./index";

describe("<Header />", () => {
  it("should have the correct title", () => {
    cy.mount(<Header />);
    cy.get(".header-title").should("have.text", "Control Panel");
  });

  it("should have the correct links", () => {
    cy.mount(<Header />);
    cy.get(".header-anchor").should("have.length", 2);
  });
});
