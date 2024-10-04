import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGameHistory } from "./GameHistoryContext"; // Import the GameHistoryContext
import {
  EMPTY_BOARD_STATE,
  fillInEmptyBoardStateFromPreExistingAttempts,
  Puzzle,
  PuzzleDifficulty,
  PuzzleState,
} from "@/lib/puzzles";

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
  // TODO: Fill initial board positions based on "loaded" puzzle from localStorage.
  const [boardValues, setBoardValues] = useState<string[][]>(() => {
    console.log(
      "> currentPuzzle?.attempts?.length",
      currentPuzzle?.attempts?.length
    );
    return currentPuzzle?.attempts?.length
      ? fillInEmptyBoardStateFromPreExistingAttempts(currentPuzzle.attempts)
      : EMPTY_BOARD_STATE;
  });
  console.log("> boardValues", boardValues);

  const [currentRowIndex, setCurrentRowIndex] = useState(() => {
    return currentPuzzle?.attempts?.length
      ? currentPuzzle?.attempts?.length + 1
      : 0;
  });

  // if currentPuzzle changes, reset the boardValues and currentRowIndex
  useEffect(() => {
    setBoardValues(EMPTY_BOARD_STATE);
    setCurrentRowIndex(0);
  }, [currentPuzzle?.index]);

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
    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];
      const currentRow = [...newBoard[currentRowIndex]];
      const firstEmptyIndex = currentRow.indexOf("");

      // Ensure row isn't full. This will be the only condition applied.
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

    const attemptString = boardValues[currentRowIndex].join("");
    // Ensure that all 6 tiles are filled before checking attempt
    if (attemptString.length !== 6) {
      console.log("Please fill all 6 tiles before submitting your attempt.");
      return;
    }

    // Compare the board values to the current puzzle's solution equation
    const solutionString = currentPuzzle?.solutionEquation;
    if (attemptString === solutionString) {
      console.log("Success! Your attempt matches the solution.");
      puzzleState = "succeeded";
    } else if (currentRowIndex === 5) {
      console.log("Failure! You have no remaining attempts.");
      puzzleState = "failed";
    } else {
      console.log("Incorrect attempt.");
      setCurrentRowIndex(currentRowIndex + 1);
    }

    updatePuzzleState({
      ...currentPuzzle,
      attempts: [...currentPuzzle.attempts, attemptString],
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
