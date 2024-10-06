import { createPuzzle } from "../lib/puzzles";
import {
  fillInEmptyBoardStateFromPreExistingAttempts,
  EMPTY_BOARD_STATE,
} from "../lib/puzzles";

describe("createPuzzle", () => {
  it("should create a puzzle with default values", () => {
    const puzzle = createPuzzle(10, 1, "2 + 2");

    expect(puzzle).toEqual({
      targetNumber: 10,
      index: 1,
      solutionEquation: "2 + 2",
      state: "idle", // Default value
      attempts: [], // Default value
      difficulty: "normal", // Default difficulty
    });
  });

  it("should create a puzzle with custom difficulty", () => {
    const puzzle = createPuzzle(15, 2, "3 * 5", "hard");

    expect(puzzle.difficulty).toBe("hard");
  });

  it("should create a puzzle with correct target number, index, and solution equation", () => {
    const puzzle = createPuzzle(20, 3, "4 * 5");

    expect(puzzle.targetNumber).toBe(20);
    expect(puzzle.index).toBe(3);
    expect(puzzle.solutionEquation).toBe("4 * 5");
  });
});

describe("fillInEmptyBoardStateFromPreExistingAttempts", () => {
  it("should return an empty board state when no attempts are provided", () => {
    const boardState = fillInEmptyBoardStateFromPreExistingAttempts([]);
    expect(boardState).toEqual(EMPTY_BOARD_STATE);
  });

  it("should correctly fill in the board state with pre-existing attempts", () => {
    const attempts = ["123456", "789012"];
    const boardState = fillInEmptyBoardStateFromPreExistingAttempts(attempts);

    expect(boardState[0]).toEqual([1, 2, 3, 4, 5, 6]);
    expect(boardState[1]).toEqual([7, 8, 9, 0, 1, 2]);
  });

  it("should handle non-numeric characters correctly", () => {
    const attempts = ["12+34=", "56*78="];
    const boardState = fillInEmptyBoardStateFromPreExistingAttempts(attempts);

    expect(boardState[0]).toEqual([1, 2, "+", 3, 4, "="]);
    expect(boardState[1]).toEqual([5, 6, "*", 7, 8, "="]);
  });
});
