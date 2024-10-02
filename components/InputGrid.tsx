import React, { useEffect } from "react";
import { useBoard } from "../contexts/BoardContext";

const MathInputGrid: React.FC = () => {
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
    <div className="math-input-grid">
      {/* Row 1: Numbers 0-9 */}
      <div className="row">
        {[...Array(10).keys()].map((number) => (
          <button key={number} onClick={() => addTileValue(String(number))}>
            {number}
          </button>
        ))}
      </div>

      {/* Row 2: Operators +, -, *, / */}
      <div className="row">
        {["+", "-", "*", "/"].map((operator) => (
          <button key={operator} onClick={() => addTileValue(operator)}>
            {operator}
          </button>
        ))}
      </div>

      {/* Row 3: Enter and Delete */}
      <div className="row">
        <button onClick={submitAttempt}>Enter</button>
        <button onClick={deletePreviousTileValue}>Delete</button>
      </div>
    </div>
  );
};

export default MathInputGrid;
