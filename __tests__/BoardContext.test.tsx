import { renderHook, act } from "@testing-library/react-hooks";
import { BoardProvider, useBoard } from "../contexts/BoardContext";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";

describe("BoardContext", () => {
  it("adds a tile value to the board", () => {
    const { result } = renderHook(() => useBoard(), {
      wrapper: ({ children }) => (
        <GameHistoryProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameHistoryProvider>
      ),
    });

    act(() => {
      result.current.addTileValue("1");
    });

    expect(result.current.boardValues[0][0]).toBe("1");
  });

  it("deletes the previous tile value", () => {
    const { result } = renderHook(() => useBoard(), {
      wrapper: ({ children }) => (
        <GameHistoryProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameHistoryProvider>
      ),
    });

    act(() => {
      result.current.addTileValue("1");
      result.current.deletePreviousTileValue();
    });

    expect(result.current.boardValues[0][0]).toBe("");
  });

  it("submits an attempt and moves to the next row if incorrect", () => {
    const { result } = renderHook(() => useBoard(), {
      wrapper: ({ children }) => (
        <GameHistoryProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameHistoryProvider>
      ),
    });

    act(() => {
      result.current.addTileValue("1");
      result.current.addTileValue("+");
      result.current.addTileValue("5");
      result.current.addTileValue("1");
      result.current.addTileValue("+");
      result.current.addTileValue("5");
      result.current.submitAttempt();
    });

    expect(result.current.currentRowIndex).toBe(1); // Should move to next row
  });

  it("ignores additional inputs after a row has 6 tiles until an attempt is submitted", () => {
    const { result } = renderHook(() => useBoard(), {
      wrapper: ({ children }) => (
        <GameHistoryProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameHistoryProvider>
      ),
    });

    // Fill the first row with 6 tiles
    act(() => {
      result.current.addTileValue("1");
      result.current.addTileValue("+");
      result.current.addTileValue("5");
      result.current.addTileValue("*");
      result.current.addTileValue("2");
      result.current.addTileValue("-");
    });

    // Attempt to add another value after 6 tiles are filled
    act(() => {
      result.current.addTileValue("3"); // Should be ignored
    });

    expect(result.current.boardValues[0].join("")).toBe("1+5*2-"); // No '3' added

    // Submit the attempt, allowing inputs to the next row
    act(() => {
      result.current.submitAttempt();
    });

    expect(result.current.currentRowIndex).toBe(1); // Moved to next row
  });
});
