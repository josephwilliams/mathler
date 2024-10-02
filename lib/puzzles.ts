export type Puzzle = {
  targetNumber: number;
  index: number | null;
  solutionEquation: (number | string)[]; // Array representing numbers and operators
  state: "idle" | "ongoing" | "succeeded" | "failed";
  attempts: string[]; // Array to track attempts made by the user
};

export const createPuzzle = (
  targetNumber: number,
  index: number | null,
  solutionEquation: (number | string)[]
): Puzzle => {
  return {
    targetNumber,
    index,
    solutionEquation,
    state: "idle",
    attempts: [],
  };
};
