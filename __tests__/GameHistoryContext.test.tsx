import { renderHook, act } from "@testing-library/react-hooks";
import {
  GameHistoryProvider,
  useGameHistory,
} from "../contexts/GameHistoryContext";
import { predefinedPuzzles } from "../lib/predefined-puzzles";

describe("GameHistoryContext", () => {
  it("loads the current puzzle from localStorage on mount", () => {
    localStorage.setItem("currentPuzzle", JSON.stringify(predefinedPuzzles[0]));
    const { result } = renderHook(() => useGameHistory(), {
      wrapper: GameHistoryProvider,
    });
    expect(result.current.currentPuzzle).toEqual(predefinedPuzzles[0]);
  });

  it("updates the current puzzle state", () => {
    const { result } = renderHook(() => useGameHistory(), {
      wrapper: GameHistoryProvider,
    });

    act(() => {
      result.current.updatePuzzleState({
        ...predefinedPuzzles[0],
        state: "succeeded",
      });
    });

    expect(result.current.currentPuzzle?.state).toEqual("succeeded");
  });

  it("generates a new puzzle after the current one is solved", () => {
    const { result } = renderHook(() => useGameHistory(), {
      wrapper: GameHistoryProvider,
    });

    act(() => {
      result.current.generateNewPuzzle();
    });

    expect(result.current.currentPuzzle).not.toEqual(predefinedPuzzles[0]);
  });
});
