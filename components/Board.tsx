import React from "react";
import { useBoard } from "../contexts/BoardContext";
import Tile from "./Tile";

const Board: React.FC = () => {
  const { boardValues, currentPuzzle } = useBoard();
  console.log("> boardValues", boardValues);

  return (
    currentPuzzle && (
      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col gap-3">
        <div className="text-sm">
          Find the hidden calculation that equals{" "}
          <span className="font-bold bg-yellow-200 px-2 py-1">
            {currentPuzzle.targetNumber}
          </span>
        </div>
        <div className="grid grid-rows-6 gap-2">
          {boardValues.map((rowValues, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-2">
              {rowValues.map((tileValue, tileIndex) => (
                <Tile
                  key={tileIndex}
                  tileValue={tileValue}
                  tileIndex={tileIndex}
                  rowIndex={tileIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Board;
