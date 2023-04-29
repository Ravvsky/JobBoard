import React from "react";
import JobOfferTile from "./JobOfferTile";

describe("<JobOfferTile />", () => {
  const title = "Job Title";
  const locationList = ["New York", "Washington"];
  const salaryRange = [2000, 3000];
  const additionalAttributes = ["Senior", "Remote", "Full Time"];
  const technologies = ["Python", "MongoDB", "Docker"];
  const isFavourite = false;

  it("renders component with all props", () => {
    cy.mount(
      <JobOfferTile
        title={title}
        locationList={locationList}
        salaryRange={salaryRange}
        additionalAttributes={additionalAttributes}
        technologies={technologies}
        isFavourite={isFavourite}
      />
    );

    cy.get('[data-cy="title"]').should("have.text", title);
    cy.get('[data-cy="locations"]').should(
      "have.text",
      `${locationList[0]} and ${locationList.length - 1} others`
    );
    cy.get('[data-cy="salary"]').should(
      "have.text",
      `$${salaryRange[0]} to $${salaryRange[1]}`
    );
    cy.get('[data-cy="technologies"] img').each((img, i) => {
      expect(img).to.have.attr("alt", technologies[i]);
    });
  });

  it("renders component with only one Location", () => {
    const locationList = ["New York"];
    cy.mount(
      <JobOfferTile
        title={title}
        locationList={locationList}
        salaryRange={salaryRange}
        additionalAttributes={additionalAttributes}
        technologies={technologies}
        isFavourite={isFavourite}
      />
    );

    cy.get('[data-cy="locations"]').should("have.text", locationList[0]);
  });

  it("renders component with no location set", () => {
    cy.mount(
      <JobOfferTile
        title={title}
        salaryRange={salaryRange}
        additionalAttributes={additionalAttributes}
        technologies={technologies}
        isFavourite={isFavourite}
      />
    );

    cy.get('[data-cy="locations"]').should(
      "have.text",
      "Location not specified"
    );
  });

  it("renders component added to favourite list", () => {
    const isFavourite = true;
    cy.mount(
      <JobOfferTile
        title={title}
        locationList={locationList}
        salaryRange={salaryRange}
        additionalAttributes={additionalAttributes}
        technologies={technologies}
        isFavourite={isFavourite}
      />
    );

    cy.get('[data-cy="favourite-icon"]')
      .should("exist")
      .and("have.class", "is-favourite");
  });
});
