export type PuzzleState = "idle" | "ongoing" | "succeeded" | "failed";
export type PuzzleDifficulty = "normal" | "hard";

export type Puzzle = {
  targetNumber: number;
  index: number | null;
  solutionEquation: string; // Array representing numbers and operators
  state: PuzzleState;
  attempts: string[]; // Array to track attempts made by the user
  difficulty?: PuzzleDifficulty;
  hasShownResultUI: boolean;
};

export const createPuzzle = (
  targetNumber: number,
  index: number | null,
  solutionEquation: string,
  difficulty = "normal" as "normal" | "hard"
): Puzzle => {
  return {
    targetNumber,
    index,
    solutionEquation,
    state: "idle",
    attempts: [],
    difficulty,
    hasShownResultUI: false,
  };
};

export const EMPTY_BOARD_STATE = [
  Array(6).fill(""),
  Array(6).fill(""),
  Array(6).fill(""),
  Array(6).fill(""),
  Array(6).fill(""),
  Array(6).fill(""),
];

export const fillInEmptyBoardStateFromPreExistingAttempts = (
  attempts: string[]
) => {
  console.log("> log attempts", attempts);
  const boardState = EMPTY_BOARD_STATE.map((row) => [...row]);

  if (Array.isArray(attempts) && !!attempts.length) {
    attempts.forEach((attempt, attemptIndex) => {
      const attemptSplit = attempt.split(",").map(Number);
      attemptSplit.forEach((value, valueIndex) => {
        boardState[attemptIndex][valueIndex] = Number.isNaN(value)
          ? value
          : Number(value);
      });
    });
  }

  return boardState;
};
