import { Puzzle } from "./puzzles";

// Predefined puzzles stored as constants to avoid computing
export const predefinedPuzzles: Puzzle[] = [
  {
    targetNumber: 78,
    index: 0,
    solutionEquation: [119, "-", 41].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 12,
    index: 1,
    solutionEquation: [21, "/", 7, "+", 9].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 17,
    index: 2,
    solutionEquation: [90, "/", 9, "+", 7].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 21,
    index: 3,
    solutionEquation: [18, "+", 6, "-", 3].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 39,
    index: 4,
    solutionEquation: [24, "*", 2, "-", 9].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 65,
    index: 5,
    solutionEquation: [112, "-", 47].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 72,
    index: 6,
    solutionEquation: [27, "*", 3, "-", 9].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 32,
    index: 7,
    solutionEquation: [28, "-", 3, "+", 7].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 27,
    index: 8,
    solutionEquation: [95, "/", 5, "+", 8].join(""),
    state: "idle",
    attempts: [],
  },
  {
    targetNumber: 73,
    index: 9,
    solutionEquation: [132, "-", 59].join(""),
    state: "idle",
    attempts: [],
  },
];
