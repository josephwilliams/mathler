import React, { useEffect, useMemo } from "react";
import { useBoard } from "../contexts/BoardContext";
import { useGameHistory } from "@/contexts/GameHistoryContext";
import classNames from "classnames";

const buttonClassName =
  "bg-gray-200 hover:bg-gray-300 px-3.5 py-1 rounded-md font-bold text-xl";

const MathInputGrid: React.FC = () => {
  const { currentPuzzle } = useGameHistory();
  const {
    addTileValue,
    deletePreviousTileValue,
    submitAttempt,
    currentRowIndex,
    boardValues,
  } = useBoard();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (!isNaN(Number(key))) {
        // Number keys (0-9)
        addTileValue(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        // Operator keys (+, -, *, /)
        addTileValue(key);
      } else if (key === "Enter") {
        submitAttempt();
      } else if (key === "Backspace") {
        deletePreviousTileValue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addTileValue, deletePreviousTileValue, submitAttempt]);

  // NOTE: This gets the correct and incorrect guesses from the current puzzle's attempts
  // in order to show the user which tiles they've gotten right or wrong on the input board.
  // I don't love this solution, and this data would probably be better stored in the context,
  // but I'm trying to keep the context as clean as possible, and so this is a quick and dirty solution.
  const { correctGuesses, incorrectGuesses, misplacedGuesses } = useMemo(() => {
    const correctSet = new Set<string>();
    const incorrectSet = new Set<string>();
    const misplacedSet = new Set<string>();

    const solutionChars = currentPuzzle?.solutionEquation.split("");

    currentPuzzle?.attempts.forEach((attempt) => {
      const attemptChars = attempt.split("");
      const solutionCharCount = new Map<string, number>();

      // Count occurrences of each character in solution
      solutionChars.forEach((char) => {
        solutionCharCount.set(char, (solutionCharCount.get(char) || 0) + 1);
      });

      attemptChars.forEach((char, index) => {
        if (char === solutionChars[index]) {
          correctSet.add(char); // Correct position
          solutionCharCount.set(char, (solutionCharCount.get(char) || 0) - 1);
        }
      });

      // Check for misplaced guesses (exists in solution but wrong position)
      attemptChars.forEach((char, index) => {
        if (
          char !== solutionChars[index] &&
          solutionChars.includes(char) &&
          (solutionCharCount.get(char) || 0) > 0
        ) {
          misplacedSet.add(char); // Misplaced
          solutionCharCount.set(char, (solutionCharCount.get(char) || 0) - 1);
        } else if (!solutionChars.includes(char)) {
          incorrectSet.add(char); // Incorrect
        }
      });
    });

    return {
      correctGuesses: correctSet,
      incorrectGuesses: incorrectSet,
      misplacedGuesses: misplacedSet,
    };
  }, [currentPuzzle?.attempts, currentPuzzle?.solutionEquation]);

  return (
    currentPuzzle?.state !== "succeeded" &&
    currentPuzzle?.state !== "failed" && (
      <div
        className="w-full bg-white shadow-lg p-5 rounded-md flex flex-col gap-3"
        data-testid="input-grid"
      >
        <div className="flex gap-2 items-center justify-between">
          {["0", "1", "2", "3", "4", "5", "6"].map((number) => (
            <button
              className={classNames(
                buttonClassName,
                misplacedGuesses.has(number) &&
                  currentPuzzle?.difficulty !== "hard" &&
                  !correctGuesses.has(number) &&
                  "bg-yellow-400",
                correctGuesses.has(number) && "bg-green-500",
                incorrectGuesses.has(number) && "bg-gray-400"
              )}
              key={number}
              onClick={() => addTileValue(String(number))}
              data-testid={`input-button-${number}`}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-between">
          {["7", "8", "9", "+", "-", "*", "/"].map((operator) => (
            <button
              className={classNames(
                buttonClassName,
                misplacedGuesses.has(operator) &&
                  currentPuzzle?.difficulty !== "hard" &&
                  !correctGuesses.has(operator) &&
                  "bg-yellow-400",
                correctGuesses.has(operator) && "bg-green-500",
                incorrectGuesses.has(operator) && "bg-gray-400"
              )}
              key={operator}
              onClick={() => addTileValue(operator)}
              data-testid={`input-button-${operator}`}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-between">
          <button
            className={classNames(
              buttonClassName,
              // if current row is full, animate the button
              boardValues[currentRowIndex]?.[
                boardValues[currentRowIndex]?.length - 1
              ] !== "" && "animate-bounce"
            )}
            onClick={submitAttempt}
            data-testid="input-grid-submit-button"
          >
            Enter
          </button>
          <button
            className={buttonClassName}
            onClick={deletePreviousTileValue}
            data-testid="input-grid-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default MathInputGrid;
