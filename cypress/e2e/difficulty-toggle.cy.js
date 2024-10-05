/// <reference types="cypress" />

describe("DifficultyToggle Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should disable difficulty select when the game is not in idle state", () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "currentPuzzle",
        JSON.stringify({
          targetNumber: 12,
          solutionEquation: "1+5*2",
          state: "ongoing",
          attempts: ["1+5*2"],
        })
      );
    });
    cy.reload();
    cy.get("select").should("be.disabled");
  });

  it("should enable difficulty select when the game is in idle state", () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "currentPuzzle",
        JSON.stringify({
          targetNumber: 12,
          solutionEquation: "1+5*2",
          state: "idle",
          attempts: [],
        })
      );
    });
    cy.reload();
    cy.get("select").should("not.be.disabled");
    cy.get("select").select("hard").should("have.value", "hard");
  });

  it("should not display yellow background tiles in hard difficulty", () => {
    // Set the game state with "hard" difficulty
    cy.window().then((win) => {
      win.localStorage.setItem(
        "currentPuzzle",
        JSON.stringify({
          targetNumber: 12,
          solutionEquation: "1+5*2",
          state: "idle",
          attempts: ["3+4*2", "1+5*1"], // These attempts have incorrect tiles
        })
      );
    });

    cy.reload();

    // Get the difficulty select element and set it to "hard"
    cy.get("#difficulty-toggle").select("hard");

    // Simulate adding tiles to the first row
    cy.get('[data-testid="input-button-2"]').click();
    // This tile would have a yellow background in easy mode
    cy.get('[data-testid="input-button-1"]').click();
    cy.get('[data-testid="input-button-3"]').click();
    cy.get('[data-testid="input-button-4"]').click();
    cy.get('[data-testid="input-button-5"]').click();
    cy.get('[data-testid="input-button-6"]').click();

    // Submit the attempt
    cy.get('[data-testid="input-grid-submit-button"]').click();

    // Ensure that no tile has the "yellow" background (yellow-400 class)
    cy.get('[data-testid="tile-1"]').should("not.have.class", "bg-yellow-400");
  });
});
