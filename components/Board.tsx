import React from "react";
import { useBoard } from "../contexts/BoardContext";
import Tile from "./Tile";

const Board: React.FC = () => {
  const { boardValues, currentPuzzle, currentRowIndex } = useBoard();

  return (
    currentPuzzle && (
      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col gap-3">
        <div className="text-sm">
          Find the hidden calculation that equals{" "}
          <span className="font-bold bg-yellow-200 px-2 py-1 rounded-md">
            {currentPuzzle.targetNumber}
          </span>
        </div>
        <div className="grid grid-rows-6 gap-2" data-testid="board-values">
          {boardValues.map((rowValues, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-6 gap-2"
              data-testid={`board-row-${rowIndex}`}
            >
              {rowValues.map((tileValue, tileIndex) => {
                const isCurrentRow = rowIndex === currentRowIndex;
                // Active tile is the first empty tile in the current row.
                const isActiveTile =
                  isCurrentRow && rowValues.indexOf("") === tileIndex;

                return (
                  // NOTE: The tile itself shouldn't have to do any internal logic,
                  // it's a stateless component that just displays the tile value/state.
                  <Tile
                    key={tileIndex}
                    tileValue={tileValue}
                    isCompletedRow={
                      tileValue !== "" &&
                      (rowIndex < currentRowIndex ||
                        currentPuzzle.state === "succeeded" ||
                        currentPuzzle.state === "failed")
                    }
                    isCorrectlyPlacedValue={
                      String(tileValue) ===
                      currentPuzzle.solutionEquation[tileIndex]
                    }
                    isValueInSolution={
                      currentPuzzle.solutionEquation.includes(
                        String(tileValue)
                      ) && currentPuzzle.difficulty !== "hard"
                    }
                    isActiveTile={
                      isActiveTile &&
                      !(
                        currentPuzzle.state === "succeeded" ||
                        currentPuzzle.state === "failed"
                      )
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Board;
