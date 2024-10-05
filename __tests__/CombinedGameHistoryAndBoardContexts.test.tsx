import { renderHook } from "@testing-library/react-hooks";
import { BoardProvider, useBoard } from "../contexts/BoardContext";
import {
  GameHistoryProvider,
  useGameHistory,
} from "../contexts/GameHistoryContext";

describe("Combined GameHistory and BoardContext", () => {
  it("populates the board from currentPuzzle.attempts on initial load", () => {
    const predefinedPuzzle = {
      targetNumber: 142,
      solutionEquation: "100+42",
      state: "ongoing",
      attempts: ["1+5*2", "3*4-2"],
      index: 0,
    };

    // Mock useGameHistory to return predefinedPuzzle
    jest.spyOn(localStorage, "getItem").mockImplementation((key) => {
      if (key === "currentPuzzle") return JSON.stringify(predefinedPuzzle);
      return null;
    });

    // @ts-ignore - ignore unused var.
    const { result: gameHistoryResult } = renderHook(() => useGameHistory(), {
      wrapper: GameHistoryProvider,
    });

    const { result: boardResult } = renderHook(() => useBoard(), {
      wrapper: ({ children }) => (
        <GameHistoryProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameHistoryProvider>
      ),
    });

    // Check if board is populated with currentPuzzle's attempts
    expect(boardResult.current.boardValues[0].join("")).toBe("1+5*2");
    expect(boardResult.current.boardValues[1].join("")).toBe("3*4-2");
    expect(boardResult.current.currentRowIndex).toBe(2); // Since there are two attempts
  });
});
