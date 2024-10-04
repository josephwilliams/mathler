import { predefinedPuzzles } from "@/lib/predefined-puzzles";
import { Puzzle } from "@/lib/puzzles";
import React, { createContext, useContext, useState, useEffect } from "react";

// Load data from localStorage
const loadGameData = (): {
  currentPuzzle: Puzzle | null;
  pastPuzzles: Puzzle[];
} => {
  const currentPuzzle = JSON.parse(
    localStorage.getItem("currentPuzzle") || "null"
  ) as Puzzle | null;
  const pastPuzzles = JSON.parse(
    localStorage.getItem("pastPuzzles") || "[]"
  ) as Puzzle[];
  return { currentPuzzle, pastPuzzles };
};

// Save game data to localStorage
const saveGameData = (
  currentPuzzle: Puzzle | null,
  pastPuzzles?: Puzzle[]
): void => {
  localStorage.setItem("currentPuzzle", JSON.stringify(currentPuzzle));
  if (pastPuzzles) {
    localStorage.setItem("pastPuzzles", JSON.stringify(pastPuzzles));
  }
};

// Context type
interface GameHistoryContextType {
  currentPuzzle: Puzzle | null;
  pastPuzzles: Puzzle[];
  updatePuzzleState: (updatedPuzzle: Puzzle) => void;
  generateNewPuzzle: () => void;
}

// Create the GameHistoryContext
const GameHistoryContext = createContext<GameHistoryContextType | undefined>(
  undefined
);

// Provider component to manage game state
export const GameHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [pastPuzzles, setPastPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    // Load game data from localStorage on mount
    const { currentPuzzle: loadedPuzzle, pastPuzzles: loadedPastPuzzles } =
      loadGameData();

    if (loadedPuzzle) {
      setCurrentPuzzle(loadedPuzzle);
    } else {
      const newPuzzle = predefinedPuzzles[0];
      setCurrentPuzzle(newPuzzle);
      // Save new puzzle to localStorage
      saveGameData(newPuzzle, loadedPastPuzzles);
    }

    setPastPuzzles(loadedPastPuzzles);
  }, []);

  console.log("> game history currentPuzzle", currentPuzzle);

  const updatePuzzleState = (updatedPuzzle: Puzzle) => {
    // Update the current daily puzzle and save to localStorage
    setCurrentPuzzle(updatedPuzzle);
    saveGameData(updatedPuzzle);
  };

  const generateNewPuzzle = () => {
    const isGameOver =
      currentPuzzle?.state === "succeeded" || currentPuzzle?.state === "failed";

    // Only allow generating a new puzzle if the current one is 'succeeded' or 'failed'
    if (isGameOver) {
      // Move the current puzzle to history
      const updatedPastPuzzles = [...pastPuzzles, currentPuzzle];
      const nextPuzzleIndex =
        currentPuzzle.index! < predefinedPuzzles.length
          ? currentPuzzle.index + 1
          : 0;
      const newPuzzle = predefinedPuzzles[nextPuzzleIndex];

      setCurrentPuzzle(newPuzzle);
      setPastPuzzles(updatedPastPuzzles);

      saveGameData(newPuzzle, updatedPastPuzzles); // Save updated data to localStorage
    } else {
      console.warn(
        "Cannot generate a new puzzle unless the current one is 'succeeded' or 'failed'."
      );
    }
  };

  return (
    <GameHistoryContext.Provider
      value={{
        currentPuzzle,
        pastPuzzles,
        updatePuzzleState,
        generateNewPuzzle,
      }}
    >
      {children}
    </GameHistoryContext.Provider>
  );
};

// Custom hook to access game history context
export const useGameHistory = (): GameHistoryContextType => {
  const context = useContext(GameHistoryContext);
  if (context === undefined) {
    throw new Error("useGameHistory must be used within a GameHistoryProvider");
  }
  return context;
};
