import { render, screen } from "@testing-library/react";
import { BoardProvider } from "../contexts/BoardContext";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import Board from "../components/Board";

// Mock for the context's useGameHistory
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

describe("Board Component", () => {
  it("renders the target number and empty board", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Check that the target number is displayed
    expect(
      screen.getByText("Find the hidden calculation that equals")
    ).toBeInTheDocument();
    expect(screen.getByText("142")).toBeInTheDocument();

    // Check that the board renders 6 rows
    const rows = screen.getAllByRole("grid");
    expect(rows.length).toBe(6);
  });

  it("renders tiles as empty when the board is initially rendered", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // All tiles should be empty at the start
    const tiles = screen.getAllByText("");
    expect(tiles.length).toBe(36); // 6 rows * 6 tiles
  });
});
