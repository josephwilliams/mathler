import { render, screen } from "@testing-library/react";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import { BoardProvider } from "../contexts/BoardContext";
import Board from "../components/Board";
import InputGrid from "../components/InputGrid"; // Assuming this is the input component

// Mock GameHistoryContext to return predefined puzzle with multiple failed attempts
jest.mock("../contexts/GameHistoryContext", () => ({
  useGameHistory: () => ({
    currentPuzzle: {
      targetNumber: 12,
      solutionEquation: "1+5*2",
      state: "failed", // Set the game state to failed
      attempts: ["3*4-2", "1-3+5", "2+2-4", "4*3/2", "2+3*4", "1/2*3"], // Failed attempts
    },
  }),
}));

describe("Board Component with Success and Failure States", () => {
  it("renders the correct colors for tiles in the failure state", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Check last attempt tiles (based on last failed attempt '1/2*3')
    expect(screen.getByTestId("tile-1")).toHaveClass("bg-gray-400"); // Incorrect value
    expect(screen.getByTestId("tile-/")).toHaveClass("bg-gray-400"); // Incorrect value
    expect(screen.getByTestId("tile-2")).toHaveClass("bg-green-500"); // Correct value, correct position
    expect(screen.getByTestId("tile-*")).toHaveClass("bg-yellow-400"); // Correct value, wrong position
    expect(screen.getByTestId("tile-3")).toHaveClass("bg-gray-400"); // Incorrect value
  });

  it("opens the result modal when the game fails", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Check that the result modal is displayed after failure
    expect(screen.getByText("Game Result")).toBeInTheDocument(); // Modal title
    expect(screen.getByText("😭 You failed!")).toBeInTheDocument(); // Failure message
    expect(screen.getByText("The Solution:")).toBeInTheDocument();
    expect(screen.getByText("1+5*2")).toBeInTheDocument(); // Solution shown in the modal
  });

  it("does not render the input grid when the game has failed", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <InputGrid /> {/* Rendering InputGrid to check for absence */}
        </BoardProvider>
      </GameHistoryProvider>
    );

    // The input grid should not be rendered in the failure state
    expect(screen.queryByTestId("input-grid")).not.toBeInTheDocument();
  });
});
