import React from "react";
import RangeSlider from "./RangeSlider";
import { Providers } from "@/redux/provider";
describe("<RangeSlider />", () => {
  beforeEach(() => {
    cy.mount(
      <Providers>
        <RangeSlider min={0} max={1000} />
      </Providers>,
    );
  });
  it("should update the range slider when the minimum value changes", () => {
    cy.get('input[type="range"]').eq(0).as("minRange");

    // Move the minimum slider to the right
    cy.get("@minRange").invoke("val", 301).trigger("input", { force: true });

    // Verify that the minimum slider moved and the range width updated
    cy.get('[data-cy="range-slider-range"]').should(
      "have.attr",
      "style",
      "left: 30%; width: 70%;",
    );
  });

  it("should update the range slider when the maximum value changes", () => {
    cy.get('input[type="range"]').eq(1).as("maxRange");

    // Move the maximum slider to the left
    cy.get("@maxRange").invoke("val", "701").trigger("input", { force: true });

    cy.get('[data-cy="range-slider-range"]').should(
      "have.attr",
      "style",
      "left: 0%; width: 70%;",
    );
  });
});
