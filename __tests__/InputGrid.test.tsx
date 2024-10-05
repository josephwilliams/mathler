import { render, screen, fireEvent } from "@testing-library/react";
import { BoardProvider } from "../contexts/BoardContext";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import InputGrid from "../components/InputGrid";

// Mock context
jest.mock("../contexts/GameHistoryContext", () => ({
  useGameHistory: () => ({
    currentPuzzle: {
      targetNumber: 142,
      solutionEquation: "100+42",
      state: "idle",
      attempts: [],
    },
  }),
}));

describe("InputGrid Component", () => {
  it("renders number and operator buttons", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <InputGrid />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Check that number buttons are rendered
    const numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    numberButtons.forEach((num) => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });

    // Check that operator buttons are rendered
    const operators = ["+", "-", "*", "/"];
    operators.forEach((op) => {
      expect(screen.getByText(op)).toBeInTheDocument();
    });
  });

  it("adds a value when a number or operator button is pressed", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <InputGrid />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Simulate number input
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("5"));

    // Expect the board to update with the input values
    const tiles = screen.getAllByRole("button");
    expect(tiles[0]).toHaveTextContent("1");
    expect(tiles[1]).toHaveTextContent("+");
    expect(tiles[2]).toHaveTextContent("5");
  });

  it("deletes the previous tile when delete is pressed", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <InputGrid />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Simulate number input
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("Delete"));

    // Expect the last input to be deleted
    const tiles = screen.getAllByRole("button");
    expect(tiles[0]).toHaveTextContent(""); // Should be empty after delete
  });
});
