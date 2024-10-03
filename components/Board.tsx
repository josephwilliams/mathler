import React from "react";
import { useBoard } from "../contexts/BoardContext";
import Tile from "./Tile";
import GameResultConfetti from "@/components/Confetti";

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
        <div className="grid grid-rows-6 gap-2">
          {boardValues.map((rowValues, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-2">
              {rowValues.map((tileValue, tileIndex) => {
                const isCurrentRow = rowIndex === currentPuzzle.index;
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
                      tileValue === currentPuzzle.solutionEquation[tileIndex]
                    }
                    isValueInSolution={currentPuzzle.solutionEquation.includes(
                      tileValue
                    )}
                    isActiveTile={isActiveTile}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <GameResultConfetti />
      </div>
    )
  );
};

export default Board;
