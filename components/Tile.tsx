import classNames from "classnames";
import React, { memo } from "react";

interface TileProps {
  tileValue: string;
  isCompletedRow: boolean;
  isCorrectlyPlacedValue: boolean;
  isValueInSolution: boolean;
  isActiveTile: boolean;
}

// Memoize the Tile component to prevent unnecessary re-renders or
// re-computations of the background color.
const Tile: React.FC<TileProps> = memo(
  ({
    tileValue,
    isCompletedRow,
    isCorrectlyPlacedValue,
    isValueInSolution,
    isActiveTile,
  }) => {
    return (
      <div
        className={classNames(
          {
            "animate-bounce": isActiveTile,
            "bg-gray-100 text-black": !isCompletedRow,
            "bg-gray-200":
              isCompletedRow && !isCorrectlyPlacedValue && !isValueInSolution,
            "bg-green-500 text-white": isCompletedRow && isCorrectlyPlacedValue,
            "bg-yellow-400 text-black":
              isCompletedRow && isValueInSolution && !isCorrectlyPlacedValue,
          },
          "w-12 h-12 flex items-center justify-center text-lg font-bold rounded-md"
        )}
      >
        {tileValue}
      </div>
    );
  }
);

Tile.displayName = "Tile";

export default Tile;
