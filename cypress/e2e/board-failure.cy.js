/// <reference types="cypress" />

describe("Board Component with Failure State", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "currentPuzzle",
        JSON.stringify({
          targetNumber: 20,
          solutionEquation: "10+5*2",
          state: "ongoing",
          difficulty: "normal",
          attempts: ["3*4-21", "1-3+54", "2+2-42", "4*3/21", "2+3*44"],
        })
      );
    });

    cy.reload();
  });

  it("populates the board from currentPuzzle.attempts on initial load", () => {
    // Check if the first row is populated with "1+5*2"
    cy.get('[data-testid="board-row-0"]').should("contain.text", "3*4-21");
    cy.get('[data-testid="board-row-1"]').should("contain.text", "1-3+54");
    cy.get('[data-testid="board-row-2"]').should("contain.text", "2+2-42");
    cy.get('[data-testid="board-row-3"]').should("contain.text", "4*3/21");
    cy.get('[data-testid="board-row-4"]').should("contain.text", "2+3*44");
  });

  it("opens the result modal when the game fails", () => {
    // Fill in final failing values
    cy.get('[data-testid="input-button-2"]').click();
    cy.get('[data-testid="input-button-3"]').click();
    cy.get('[data-testid="input-button-4"]').click();
    cy.get('[data-testid="input-button-2"]').click();
    cy.get('[data-testid="input-button-3"]').click();
    cy.get('[data-testid="input-button-4"]').click();
    // Submit the final attempt
    cy.get('[data-testid="input-grid-submit-button"]').click();
    // Check that the result modal is displayed after failure
    cy.contains("Game Result").should("be.visible"); // Modal title
    cy.contains("😭 You failed!").should("be.visible"); // Failure message
    cy.contains("The Solution:").should("be.visible");
    cy.contains("10+5*2").should("be.visible"); // Solution shown in the modal
  });

  it("does not render the input grid when the game has failed", () => {
    // The input grid should not be rendered in the failure state
    cy.get('[data-testid="input-grid"]').should("not.exist");
  });
});
