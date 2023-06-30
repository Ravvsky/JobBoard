import React from "react";
import RoundedImage from "./RoundedImage";

describe("<RoundedImage />", () => {
  const src = "http://localhost:1337/uploads/unnamed_258bcb0d8c.png";

  it("calls onClick function when image is clicked", () => {
    const onClick = cy.stub();
    cy.mount(
      <RoundedImage
        src={src}
        alt={""}
        onClick={onClick}
        width={1}
        height={1}
      />,
    );
    cy.get("img")
      .click()
      .then(() => {
        expect(onClick).to.be.calledOnce;
      });
  });
  it("passes className prop to Image component", () => {
    const className = "example-class";
    cy.mount(
      <RoundedImage
        src={src}
        alt={""}
        className={className}
        width={1}
        height={1}
      />,
    );
    cy.get("img").should("have.class", className);
  });
});
