import { mount } from "cypress/react18";
import React from "react";
import Checkbox from "./Checbox";

describe("<Checkbox />", () => {
  it("renders", () => {
    mount(
      <Checkbox
        name="xdxd"
        id="test-checkbox"
        value="test-value"
        onChange={() => console.log("Checkbox changed")}
      />,
    );

    cy.get('input[type="checkbox"]').should("exist");
    cy.get('input[type="checkbox"]').should("have.attr", "id", "test-checkbox");
    cy.get('input[type="checkbox"]').should("have.attr", "value", "test-value");
  });
  it("triggers onChange event when checkbox is checked/unchecked", () => {
    const onChange = cy.spy();
    mount(
      <Checkbox
        id="test-checkbox"
        name="xdxd"
        value="test-value"
        onChange={onChange}
      />,
    );

    cy.get('input[type="checkbox"]')
      .check()
      .then(() => {
        expect(onChange).to.be.calledOnce;
      });

    cy.get('input[type="checkbox"]')
      .uncheck()
      .then(() => {
        expect(onChange).to.be.calledTwice;
      });
  });
  it("is unchecked by default", () => {
    mount(
      <Checkbox
        id="test-checkbox"
        name="xdxd"
        value="test-value"
        onChange={() => {
          console.log("xd");
        }}
      />,
    );
    cy.get('input[type="checkbox"]').should("not.be.checked");
  });
});
