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
  correctGuesses: number | string[];
  incorrectGuesses: number | string[];
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
    correctGuesses: [],
    incorrectGuesses: [],
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
  const boardState = EMPTY_BOARD_STATE.map((row) => [...row]);

  if (Array.isArray(attempts) && attempts.length) {
    attempts.forEach((attempt, attemptIndex) => {
      const attemptSplit = attempt.split(""); // Split each character individually
      attemptSplit.forEach((char, valueIndex) => {
        boardState[attemptIndex][valueIndex] = isNaN(Number(char))
          ? char
          : Number(char); // Check if it's a valid number, otherwise use the character
      });
    });
  }

  return boardState;
};
