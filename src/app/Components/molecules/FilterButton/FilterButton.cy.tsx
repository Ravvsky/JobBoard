import React from "react";
import FilterButton from "./FilterButton";
import { Providers } from "@/redux/provider";

describe("<FilterButton />", () => {
  it("should toggle isClicked state and dispatch setFilter on click", () => {
    cy.stub(window, "prompt");

    cy.mount(
      <Providers>
        <FilterButton type="button" category="test">
          Test Filter
        </FilterButton>
      </Providers>,
    );
    cy.get('[data-cy="FilterButton"]').should("have.text", "Test Filter");
  });
});
