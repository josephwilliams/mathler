import { render, screen } from "@testing-library/react";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import { StatsCard } from "../components/StatsModal";

// Mock GameHistoryContext with predefined puzzle data
jest.mock("../contexts/GameHistoryContext", () => ({
  useGameHistory: () => ({
    pastPuzzles: [
      { state: "succeeded", attempts: ["1+5*2"] },
      { state: "failed", attempts: ["1+5-3", "2*2-1"] },
    ],
    currentPuzzle: {
      state: "succeeded",
      attempts: ["1+5*2"],
    },
  }),
}));

describe("StatsCard Component", () => {
  it("calculates the total number of puzzles", () => {
    render(
      <GameHistoryProvider>
        <StatsCard />
      </GameHistoryProvider>
    );

    // Expect total puzzles to be 3 (2 past puzzles + 1 current puzzle)
    expect(screen.getByText("Total Puzzles")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calculates the win rate correctly", () => {
    render(
      <GameHistoryProvider>
        <StatsCard />
      </GameHistoryProvider>
    );

    // Two puzzles were "succeeded", one was "failed" -> Win rate should be 66%
    expect(screen.getByText("Win Rate")).toBeInTheDocument();
    expect(screen.getByText("66%")).toBeInTheDocument();
  });

  it("calculates the average number of attempts", () => {
    render(
      <GameHistoryProvider>
        <StatsCard />
      </GameHistoryProvider>
    );

    // Attempts: ['1+5*2'], ['1+5-3', '2*2-1'], ['1+5*2']
    // Average attempts: (1 + 2 + 1) / 3 = 1.33
    expect(screen.getByText("Average Attempts")).toBeInTheDocument();
    expect(screen.getByText("1.33")).toBeInTheDocument();
  });
});
