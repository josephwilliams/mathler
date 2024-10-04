import { useBoard } from "@/contexts/BoardContext";
import { useGameHistory } from "@/contexts/GameHistoryContext";
import { PuzzleDifficulty } from "@/lib/puzzles";
import { Tooltip } from "react-tooltip";

export default function DifficultyDropdown() {
  const { currentPuzzle } = useGameHistory();
  const { updateBoardDifficulty, boardDifficulty } = useBoard();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateBoardDifficulty(event.target.value as PuzzleDifficulty);
  };

  return (
    <div
      className="bg-white shadow-lg px-2 py-2 rounded-md flex flex-col justify-center min-w-[94px]"
      data-tooltip-id="my-tooltip"
      data-tooltip-content="On hard difficulty, only green spaces (exact matches) are shown. Difficulty can only be set before starting a new game."
    >
      <label className="text-xs font-medium text-gray-400">Difficulty</label>
      <select
        value={boardDifficulty}
        onChange={handleSelectChange}
        className="text-xs rounded-md bg-gray-100 py-2 pl-1 pr-3 outline-none"
        disabled={currentPuzzle.state !== "idle"}
      >
        <option value="normal">Normal</option>
        <option
          value="hard"
          data-tip="On hard difficulty, only green spaces (exact matches) are shown. Difficulty can only be set before starting the game."
        >
          Hard
        </option>
      </select>
      <Tooltip
        place="bottom"
        id="my-tooltip"
        style={{
          maxWidth: "200px",
        }}
      />
    </div>
  );
}
