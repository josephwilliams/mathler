/// <reference types="cypress" />

describe("Board page with InputGrid and Success State", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the target number and empty board", () => {
    // Check that the target number is displayed
    cy.contains("Find the hidden calculation that equals").should("exist");
    cy.contains("78").should("exist");

    // Check that the board renders 6 rows
    cy.get('[data-testid="board-row-0"]').within(() => {
      cy.get("div").should("have.length", 6); // Ensure 6 rows
    });
  });

  it("renders tiles as empty when the board is initially rendered", () => {
    // All tiles should be empty at the start
    cy.get('[data-testid="board-values"]').within(() => {
      cy.get("div").each(($el) => {
        cy.wrap($el).should("have.text", ""); // Empty tiles
      });
    });
  });

  it("renders number and operator buttons", () => {
    // Check that number buttons are rendered
    const numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    numberButtons.forEach((num) => {
      cy.get(`[data-testid="input-button-${num}"]`).should("be.visible");
    });

    // Check that operator buttons are rendered
    const operators = ["+", "-", "*", "/"];
    operators.forEach((op) => {
      cy.get(`[data-testid="input-button-${op}"]`).should("be.visible");
    });
  });

  it("adds a tile value to the board", () => {
    // Click the input button with the id `input-button-1`
    cy.get('[data-testid="input-button-1"]').click();

    // Verify that the board now contains the value "1"
    cy.get('[data-testid="board-values"]').should("contain.text", "1");
  });

  it("deletes the previous tile value", () => {
    // Add and then delete the tile value
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-grid-delete-button"]').click();

    // Verify that the tile value is no longer present
    cy.get('[data-testid="board-values"]').should("not.contain.text", "1");
  });

  it("submits an attempt and moves to the next row", () => {
    // Simulate adding tiles to the first row
    for (let i = 0; i < 6; i++) {
      cy.get('[data-testid="input-button-1"]').click();
    }

    // Submit the attempt
    cy.get('[data-testid="input-grid-submit-button"]').click();

    // Add a new tile to the second row
    cy.get('[data-testid="input-button-2"]').click();

    // Verify that the second row contains "2"
    cy.get('[data-testid="board-row-1"]').should("contain.text", "2");
  });

  it("renders tiles with correct colors based on attempts", () => {
    // Simulate adding the first incorrect attempt: '123+67'
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-button-2"]').click();
    cy.get('[data-testid="input-button-3"]').click();
    cy.get('[data-testid="input-button-+"]').click();
    cy.get('[data-testid="input-button-6"]').click();
    cy.get('[data-testid="input-button-7"]').click();
    cy.get('[data-testid="input-grid-submit-button"]').click();

    // First row tiles (based on the first incorrect attempt '123+67')
    cy.get('[data-testid="tile-1"]').should("have.class", "bg-green-500"); // Correct value, correct position
    cy.get('[data-testid="tile-2"]').should("have.class", "bg-gray-400"); // Incorrect value
    cy.get('[data-testid="tile-3"]').should("have.class", "bg-gray-400"); // Incorrect value
    cy.get('[data-testid="tile-+"]').should("have.class", "bg-gray-400"); // Incorrect operator
    cy.get('[data-testid="tile-6"]').should("have.class", "bg-gray-400"); // Incorrect value
    cy.get('[data-testid="tile-7"]').should("have.class", "bg-gray-400"); // Incorrect value

    // Simulate adding the second correct attempt: '119-41'
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-button-9"]').click();
    cy.get('[data-testid="input-button--"]').click();
    cy.get('[data-testid="input-button-4"]').click();
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-grid-submit-button"]').click();

    // Second row tiles (based on the correct attempt '119-41', all should be green)
    ["1", "1", "9", "-", "4", "1"].forEach((content) => {
      cy.get(`[data-testid="tile-${content}"]`).should(
        "have.class",
        "bg-green-500"
      );
    });
  });
});
