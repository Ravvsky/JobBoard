import React from "react";
import FilterOption from "./FilterOption";
import { Providers } from "@/redux/provider";

describe("<FilterOption />", () => {
  it("renders with correct label  ", () => {
    // see: https://on.cypress.io/mounting-react
    const label = "label";
    const category = "category";
    cy.mount(
      <Providers>
        <FilterOption label={label} category={label} />
      </Providers>
    );
    cy.get('[data-cy="label"]').contains(label);
  });
});
