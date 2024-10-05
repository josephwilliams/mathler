import { render, screen } from "@testing-library/react";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import { BoardProvider } from "../contexts/BoardContext";
import Board from "../components/Board";

// Mock GameHistoryContext to return predefined puzzle with multiple attempts
jest.mock("../contexts/GameHistoryContext", () => ({
  useGameHistory: () => ({
    currentPuzzle: {
      targetNumber: 12,
      solutionEquation: "1+5*2",
      state: "ongoing",
      attempts: ["3*4-2", "1+5*2"],
    },
  }),
}));

describe("Board Component with Multiple Attempts and Correct Colors", () => {
  it("renders tiles with correct colors based on attempts", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // First row tiles (based on the first attempt '3*4-2')
    expect(screen.getByTestId("tile-3")).toHaveClass("bg-gray-400");
    expect(screen.getByTestId("tile-*")).toHaveClass("bg-yellow-400");
    expect(screen.getByTestId("tile-4")).toHaveClass("bg-gray-400");
    expect(screen.getByTestId("tile--")).toHaveClass("bg-gray-400");
    expect(screen.getByTestId("tile-2")).toHaveClass("bg-green-500");

    // Second row tiles (based on the second attempt '1+5*2', all should be green)
    ["1", "+", "5", "*", "2"].forEach((content) => {
      expect(screen.getByTestId(`tile-${content}`)).toHaveClass("bg-green-500");
    });
  });
});
