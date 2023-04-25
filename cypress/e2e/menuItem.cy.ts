describe("MenuItem component", () => {
  it("should render the link with the correct text and href", () => {
    const menuItemText = "Jobs";
    const menuItemHref = "/";

    cy.visit("localhost:3000");

    cy.contains("a", menuItemText).should("have.attr", "href", menuItemHref);

    cy.get("a").contains(menuItemText).should("have.class", "text-main-blue");
  });

  it("should not have text-main-blue class when it's  menu item is not a current page", () => {
    const menuItemText = "Companies";

    cy.visit("localhost:3000");

    cy.get("a")
      .contains(menuItemText)
      .should("not.have.class", "text-main-blue");
  });
});
