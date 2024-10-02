import React, { createContext, useContext, useState } from "react";
import { useGameHistory } from "./GameHistoryContext"; // Import the GameHistoryContext
import { Puzzle } from "@/lib/puzzles";

interface BoardContextType {
  boardValues: string[][];
  currentRowIndex: number;
  addTileValue: (value: string) => void;
  deletePreviousTileValue: () => void;
  submitAttempt: () => void;
  currentPuzzle: Puzzle; // Add the currentPuzzle here to access it in the board
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentPuzzle } = useGameHistory(); // Pull the currentPuzzle from GameHistoryContext
  const [boardValues, setBoardValues] = useState<string[][]>([
    Array(6).fill(""),
  ]); // Start with one row of 6 length
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  // Function to add a value to the board
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

  // Function to delete the last value from the current row
  const deletePreviousTileValue = () => {
    setBoardValues((prevBoard) => {
      const newBoard = [...prevBoard];
      const currentRow = [...newBoard[currentRowIndex]];
      const lastFilledIndex = currentRow.lastIndexOf("");
      const targetIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex - 1;
      currentRow[targetIndex] = "";
      newBoard[currentRowIndex] = currentRow;
      return newBoard;
    });
  };

  // Function to submit the current attempt
  const submitAttempt = () => {
    const attemptString = boardValues[currentRowIndex].join(" ");

    // Compare the board values to the current puzzle's solution equation
    const solutionString = currentPuzzle?.solutionEquation.join(" ");
    if (attemptString === solutionString) {
      console.log("Success! Your attempt matches the solution.");
      // Mark the puzzle as succeeded, if necessary
    } else {
      console.log("Incorrect attempt.");
      // Move to the next row for another attempt
      if (currentRowIndex < 5) {
        setBoardValues((prevBoard) => [...prevBoard, Array(6).fill("")]);
        setCurrentRowIndex(currentRowIndex + 1);
      }
    }
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
