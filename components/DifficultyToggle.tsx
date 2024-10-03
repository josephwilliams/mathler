import { useBoard } from "@/contexts/BoardContext";
import { PuzzleDifficulty } from "@/lib/puzzles";

export default function DifficultyDropdown() {
  const { updateBoardDifficulty, boardDifficulty } = useBoard();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateBoardDifficulty(event.target.value as PuzzleDifficulty);
  };

  return (
    <div className="bg-white shadow-lg px-2 py-2 rounded-md flex flex-col justify-center min-w-[94px]">
      <label className="text-xs font-medium text-gray-400">Difficulty</label>
      <select
        value={boardDifficulty}
        onChange={handleSelectChange}
        className="text-xs rounded-md bg-gray-100 py-2 pl-1 pr-3 outline-none"
      >
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
