import React from "react";
import Button from "./Button";

describe("<Button />", () => {
  it("should render with the correct class and text", () => {
    // see: https://on.cypress.io/mounting-react
    const onClick = cy.stub();
    cy.mount(
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <Button type="submit" onClick={onClick} className="custom-class">
        Button
      </Button>,
    );

    cy.get("button")
      .should("have.class", "custom-class")
      .should("have.attr", "type", "submit")
      .should("have.text", "Button");
  });

  it("should call onClick when clicked", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <Button onClick={onClick} type="submit">
        Button
      </Button>,
    );
    cy.get("button").click();
    cy.get("@onClick").should("have.been.called");
  });
});
