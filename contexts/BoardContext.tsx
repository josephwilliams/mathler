import React, { createContext, useContext, useState } from "react";
import { useGameHistory } from "./GameHistoryContext"; // Import the GameHistoryContext
import { Puzzle, PuzzleDifficulty, PuzzleState } from "@/lib/puzzles";

interface BoardContextType {
  boardValues: string[][];
  currentRowIndex: number;
  addTileValue: (value: string) => void;
  deletePreviousTileValue: () => void;
  submitAttempt: () => void;
  currentPuzzle: Puzzle; // Add the currentPuzzle here to access it in the board
  boardDifficulty: PuzzleDifficulty;
  updateBoardDifficulty: (PuzzleDifficulty) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  // NOTE: Get currentPuzzle from localStorage.
  const { currentPuzzle, updatePuzzleState } = useGameHistory();

  const [boardDifficulty, setBoardDifficulaty] =
    useState<PuzzleDifficulty>("normal");

  function updateBoardDifficulty(difficulty: PuzzleDifficulty) {
    // NOTE: Only allow changing puzzle difficutly if puzzle is not yet begun, i.e. "idle".
    if (
      currentPuzzle.state === "idle" &&
      (difficulty === "normal" || difficulty === "hard")
    ) {
      setBoardDifficulaty(difficulty);
    }
  }

  // NOTE: Filling all initial board positions in order to ensure rendering of all empty spaces.
  const [boardValues, setBoardValues] = useState<string[][]>([
    Array(6).fill(""),
    Array(6).fill(""),
    Array(6).fill(""),
    Array(6).fill(""),
    Array(6).fill(""),
    Array(6).fill(""),
  ]);

  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  const addTileValue = (value: string) => {
    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];
      const currentRow = [...newBoard[currentRowIndex]];
      const firstEmptyIndex = currentRow.indexOf("");
      if (firstEmptyIndex !== -1) {
        currentRow[firstEmptyIndex] = value;
        newBoard[currentRowIndex] = currentRow;
      }
      return newBoard;
    });
  };

  const deletePreviousTileValue = () => {
    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];
      const currentRow = [...newBoard[currentRowIndex]];
      const lastFilledIndex = currentRow.lastIndexOf("");
      console.log("> lastFilledIndex", lastFilledIndex);
      const targetIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex - 1;
      console.log("> targetIndex", targetIndex);
      currentRow[targetIndex] = "";
      newBoard[currentRowIndex] = currentRow;
      return newBoard;
    });
  };

  const submitAttempt = () => {
    let puzzleState: PuzzleState = "ongoing";

    const attemptString = boardValues[currentRowIndex].join("");
    // Ensure that all 6 tiles are filled before checking attempt
    if (attemptString.length !== 6) {
      console.log("Please fill all 6 tiles before submitting your attempt.");
      return;
    }

    // Compare the board values to the current puzzle's solution equation
    const solutionString = currentPuzzle?.solutionEquation.join("");
    if (attemptString === solutionString) {
      console.log("Success! Your attempt matches the solution.");
      puzzleState = "succeeded";
    } else if (currentRowIndex === 5) {
      console.log("Failure! You have no remaining attempts.");
      puzzleState = "failed";
    } else {
      console.log("Incorrect attempt.");
      setBoardValues((prevBoard) => [...prevBoard, Array(6).fill("")]);
      setCurrentRowIndex(currentRowIndex + 1);
    }

    updatePuzzleState({
      ...currentPuzzle,
      state: puzzleState,
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boardValues,
        currentRowIndex,
        addTileValue,
        deletePreviousTileValue,
        submitAttempt,
        currentPuzzle,
        boardDifficulty,
        updateBoardDifficulty,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook to use the BoardContext
export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
