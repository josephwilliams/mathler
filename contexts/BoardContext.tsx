import React, { createContext, useContext, useEffect, useState } from "react";
import { useGameHistory } from "./GameHistoryContext"; // Import the GameHistoryContext
import {
  EMPTY_BOARD_STATE,
  fillInEmptyBoardStateFromPreExistingAttempts,
  Puzzle,
  PuzzleDifficulty,
  PuzzleState,
} from "@/lib/puzzles";
import { isCumulativeSolution } from "@/lib/equations";

interface BoardContextType {
  boardValues: string[][];
  currentRowIndex: number;
  addTileValue: (value: string) => void;
  deletePreviousTileValue: () => void;
  submitAttempt: () => void;
  currentPuzzle: Puzzle; // Add the currentPuzzle here to access it in the board
  boardDifficulty: PuzzleDifficulty;
  updateBoardDifficulty: (difficulty: PuzzleDifficulty) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentPuzzle, updatePuzzleState } = useGameHistory();

  const [boardDifficulty, setBoardDifficulaty] =
    useState<PuzzleDifficulty>("normal");

  useEffect(() => {
    if (
      currentPuzzle?.difficulty &&
      (currentPuzzle?.difficulty === "hard" ||
        currentPuzzle?.difficulty === "normal")
    ) {
      setBoardDifficulaty(currentPuzzle?.difficulty);
    }
  }, [currentPuzzle?.difficulty]);

  function updateBoardDifficulty(difficulty: PuzzleDifficulty) {
    // NOTE: Only allow changing puzzle difficutly if puzzle is not yet begun, i.e. "idle".
    if (
      currentPuzzle.state === "idle" &&
      (difficulty === "normal" || difficulty === "hard")
    ) {
      // update the boardDifficulty state in local storage
      updatePuzzleState({
        ...currentPuzzle,
        difficulty,
      });

      setBoardDifficulaty(difficulty);
    }
  }

  // NOTE: Filling all initial board positions in order to ensure rendering of all empty spaces.
  const [boardValues, setBoardValues] = useState<string[][]>(EMPTY_BOARD_STATE);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  // if currentPuzzle changes, update to that puzzle's attempts or reset the boardValues and currentRowIndex
  useEffect(() => {
    setBoardValues(() => {
      return currentPuzzle?.attempts?.length
        ? fillInEmptyBoardStateFromPreExistingAttempts(currentPuzzle.attempts)
        : EMPTY_BOARD_STATE;
    });
    setCurrentRowIndex(() => {
      return currentPuzzle?.attempts?.length
        ? currentPuzzle?.attempts?.length
        : 0;
    });
  }, [currentPuzzle]);

  // NOTE: This is deprecated and I'm now allowing anything but I thought I'd leave
  // it just to note some of the thought processes while coding this.
  //
  // NOTE: A few rules involving adding tile values
  // 1. Prevent adding more than 6 values to a row
  // 2. Neither the first nor last element can be a non-num character,
  // note that this would not be true if we allowed parentheses.
  // 3. Non-num chars (operators) cannot be one after another. There
  // must be a number char between them.
  const addTileValue = (value: string) => {
    if (
      currentPuzzle.state === "succeeded" ||
      currentPuzzle.state === "failed"
    ) {
      return;
    }

    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];

      // Ensure the currentRowIndex exists and has an array
      if (newBoard[currentRowIndex]) {
        const currentRow = [...newBoard[currentRowIndex]];
        const firstEmptyIndex = currentRow.indexOf("");

        // Ensure row isn't full
        if (firstEmptyIndex !== -1) {
          currentRow[firstEmptyIndex] = value;
          newBoard[currentRowIndex] = currentRow;
        }
      } else {
        console.error(
          "Invalid currentRowIndex or undefined row:",
          currentRowIndex
        );
      }

      return newBoard;
    });
  };

  const deletePreviousTileValue = () => {
    if (
      currentPuzzle.state === "succeeded" ||
      currentPuzzle.state === "failed"
    ) {
      return;
    }

    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];
      const currentRow = [...newBoard?.[currentRowIndex]];

      // Find first unfilled index, i.e. index that isn't a num or character.
      const firstUnfilledIndex = currentRow.findIndex((i) => i === "");

      // The "targetIndex" to delete will be index previous to that one.
      // In the case that firstUnfilledIndex result is -1, i.e. not found,
      // then we remove the last item, finding this by subtracting 1 from the length.
      const targetIndex =
        firstUnfilledIndex === -1
          ? newBoard[currentRowIndex].length - 1
          : firstUnfilledIndex - 1;

      currentRow[targetIndex] = "";
      newBoard[currentRowIndex] = currentRow;
      return newBoard;
    });
  };

  const submitAttempt = () => {
    let puzzleState: PuzzleState = "ongoing";

    const attemptString = boardValues[currentRowIndex]?.join("");
    // Ensure that all 6 tiles are filled before checking attempt
    if (attemptString?.length !== 6) {
      return;
    }

    // Compare the board values to the current puzzle's solution equation
    const solutionString = currentPuzzle?.solutionEquation;
    if (isCumulativeSolution(solutionString, attemptString)) {
      puzzleState = "succeeded";
    } else if (currentRowIndex === 5) {
      puzzleState = "failed";
    } else if (currentRowIndex < 5) {
      // Move to the next row if the current row is not the last row
      setCurrentRowIndex(currentRowIndex + 1);
    }

    updatePuzzleState({
      ...currentPuzzle,
      attempts: [
        ...currentPuzzle.attempts,
        // NOTE: According to official Mathler rules, cumulative
        // solutions are accepted but re-ordered to match the primary solution.
        // This helps avoid confusion with tile colors and positions.
        puzzleState === "succeeded" ? solutionString : attemptString,
      ],
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
