import { predefinedPuzzles } from "@/lib/predefined-puzzles";
import { Puzzle } from "@/lib/puzzles";
import React, { createContext, useContext, useState, useEffect } from "react";

// Load data from localStorage
const loadGameData = (): {
  dailyPuzzle: Puzzle | null;
  pastPuzzles: Puzzle[];
} => {
  const dailyPuzzle = JSON.parse(
    localStorage.getItem("dailyPuzzle") || "null"
  ) as Puzzle | null;
  const pastPuzzles = JSON.parse(
    localStorage.getItem("pastPuzzles") || "[]"
  ) as Puzzle[];
  return { dailyPuzzle, pastPuzzles };
};

// Save game data to localStorage
const saveGameData = (
  dailyPuzzle: Puzzle | null,
  pastPuzzles: Puzzle[]
): void => {
  localStorage.setItem("dailyPuzzle", JSON.stringify(dailyPuzzle));
  localStorage.setItem("pastPuzzles", JSON.stringify(pastPuzzles));
};

// Context type
interface GameHistoryContextType {
  dailyPuzzle: Puzzle | null;
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
  const [dailyPuzzle, setDailyPuzzle] = useState<Puzzle | null>(null);
  const [pastPuzzles, setPastPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    // Load game data from localStorage on mount
    const { dailyPuzzle: loadedPuzzle, pastPuzzles: loadedPastPuzzles } =
      loadGameData();

    if (loadedPuzzle) {
      setDailyPuzzle(loadedPuzzle);
    } else {
      // Start with the first predefined puzzle
      const newPuzzle = predefinedPuzzles[0];
      setDailyPuzzle(newPuzzle);
      saveGameData(newPuzzle, loadedPastPuzzles); // Save new puzzle to localStorage
    }

    setPastPuzzles(loadedPastPuzzles);
  }, []);

  const updatePuzzleState = (updatedPuzzle: Puzzle) => {
    // Update the current daily puzzle and save to localStorage
    setDailyPuzzle(updatedPuzzle);
    saveGameData(updatedPuzzle, pastPuzzles);
  };

  const generateNewPuzzle = () => {
    if (dailyPuzzle?.state === "succeeded" || dailyPuzzle?.state === "failed") {
      // Move the current puzzle to history
      const updatedPastPuzzles = [...pastPuzzles, dailyPuzzle];
      const nextPuzzleIndex =
        dailyPuzzle.index! < predefinedPuzzles.length ? dailyPuzzle.index! : 0;
      const newPuzzle = predefinedPuzzles[nextPuzzleIndex];

      setDailyPuzzle(newPuzzle);
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
      value={{ dailyPuzzle, pastPuzzles, updatePuzzleState, generateNewPuzzle }}
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
