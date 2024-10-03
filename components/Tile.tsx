import React, { memo, useMemo } from "react";
import { useBoard } from "../contexts/BoardContext";

interface TileProps {
  tileValue: string;
  tileIndex: number;
  rowIndex: number;
}

// NOTE: Memoize the Tile component to prevent unnecessary re-renders or
// re-computations of the background color.
const Tile: React.FC<TileProps> = memo(({ tileValue, tileIndex, rowIndex }) => {
  const { currentPuzzle, currentRowIndex } = useBoard();

  // Memoized function to calculate the background color
  const getTileBackgroundColor = useMemo(() => {
    const solutionEquation = currentPuzzle.solutionEquation;
    const solutionString = solutionEquation.join(" ");

    if (rowIndex < currentRowIndex) {
      // Correct position and value
      if (tileValue === solutionEquation[tileIndex]) {
        return "bg-green-500 text-white";
      }

      // Value exists in the solution but wrong position
      if (solutionString.includes(tileValue)) {
        return "bg-yellow-500 text-black";
      }
    }

    return "bg-gray-100"; // Default color for unsubmitted or unmatched values
  }, [tileValue, tileIndex, rowIndex, currentPuzzle, currentRowIndex]);

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded-md ${getTileBackgroundColor}`}
    >
      {tileValue}
    </div>
  );
});

Tile.displayName = "Tile";

export default Tile;
