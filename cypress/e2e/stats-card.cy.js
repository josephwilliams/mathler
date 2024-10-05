/// <reference types="cypress" />

describe("StatsCard Component with mocked past puzzles", () => {
  beforeEach(() => {
    // Mock local storage with lots of past puzzles
    cy.window().then((win) => {
      const mockData = {
        pastPuzzles: [
          {
            state: "succeeded",
            attempts: ["1+5*21"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "failed",
            attempts: ["1+5-30", "2*2-12"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "succeeded",
            attempts: ["1+4*2"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "succeeded",
            attempts: ["2+2*10"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "failed",
            attempts: ["2*4+2", "1-1+5"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "succeeded",
            attempts: ["4+4*24"],
            targetNumber: 34,
            solutionEquation: "",
          },
          {
            state: "failed",
            attempts: ["5*2-1", "3*3+23"],
            targetNumber: 34,
            solutionEquation: "",
          },
        ],
        currentPuzzle: {
          state: "ongoing",
          attempts: ["3*4+22"],
          targetNumber: 34,
          solutionEquation: "",
        },
      };
      win.localStorage.setItem(
        "pastPuzzles",
        JSON.stringify(mockData.pastPuzzles)
      );

      win.localStorage.setItem(
        "currentPuzzle",
        JSON.stringify(mockData.currentPuzzle)
      );
    });

    cy.reload();

    cy.visit("/"); // Change the route to match the stats page in your app

    // open data-testid "stats-modal-opener" to show the StatsCard
    cy.get('[data-testid="stats-modal-opener"]').click();
  });

  it("calculates the total number of puzzles", () => {
    // Expect total puzzles to be 8 (7 past puzzles + 1 current puzzle)
    cy.contains("Total Puzzles").should("exist");
    cy.contains("8").should("exist");
  });

  it("calculates the win rate correctly", () => {
    cy.contains("Win Rate").should("exist");
    cy.contains("50%").should("exist");
  });

  it("calculates the average number of attempts", () => {
    // Total attempts: ['1+5*21'], ['1+5-30', '2*2-12'], ['1+4*2'], ['2+2*10'],
    // ['2*4+2', '1-1+5'], ['4+4*2'], ['5*2-1', '3*3+2'], ['3*4+2']
    // Average attempts = (1 + 2 + 1 + 1 + 2 + 1 + 2 + 1) / 8 = 1.375
    cy.contains("Average Attempts").should("exist");
    cy.contains("1.38").should("exist"); // Rounded to two decimal places
  });
});
