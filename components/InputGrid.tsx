import React, { useEffect } from "react";
import { useBoard } from "../contexts/BoardContext";
import { useGameHistory } from "@/contexts/GameHistoryContext";

const buttonClassName =
  "bg-gray-200 hover:bg-gray-300 px-3.5 py-1 rounded-md font-bold text-xl";

const MathInputGrid: React.FC = () => {
  const { currentPuzzle } = useGameHistory();
  const { addTileValue, deletePreviousTileValue, submitAttempt } = useBoard();

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

  return (
    currentPuzzle?.state !== "succeeded" &&
    currentPuzzle?.state !== "failed" && (
      // NOTE: Forgive hard-coded pixel min-width but it should work in mobile viewports.
      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col gap-3">
        <div className="flex gap-2 items-center justify-between">
          {["0", "1", "2", "3", "4", "5", "6"].map((number) => (
            <button
              className={buttonClassName}
              key={number}
              onClick={() => addTileValue(String(number))}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-between">
          {["7", "8", "9", "+", "-", "*", "/"].map((operator) => (
            <button
              className={buttonClassName}
              key={operator}
              onClick={() => addTileValue(operator)}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-between">
          <button className={buttonClassName} onClick={submitAttempt}>
            Enter
          </button>
          <button className={buttonClassName} onClick={deletePreviousTileValue}>
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default MathInputGrid;
