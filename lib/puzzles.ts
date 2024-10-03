export type PuzzleState = "idle" | "ongoing" | "succeeded" | "failed";
export type PuzzleDifficulty = "normal" | "hard";

export type Puzzle = {
  targetNumber: number;
  index: number | null;
  solutionEquation: string; // Array representing numbers and operators
  state: PuzzleState;
  attempts: string[]; // Array to track attempts made by the user
  difficulty?: PuzzleDifficulty;
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
  };
};
