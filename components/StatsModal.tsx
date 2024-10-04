import { useMemo } from "react";
import ModalComponent from "./Modal";
import { useGameHistory } from "@/contexts/GameHistoryContext";

const AttemptsCountsGraph = ({ totalPuzzles }: { totalPuzzles: number }) => {
  const { pastPuzzles } = useGameHistory();

  const attemptsDistribution = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    pastPuzzles.forEach((puzzle) => {
      if (puzzle.state === "succeeded" || puzzle.state === "failed") {
        const attemptsCount = Math.min(puzzle.attempts.length, 6); // Limit counts to a maximum of 6 attempts
        counts[attemptsCount] = (counts[attemptsCount] || 0) + 1;
      }
    });

    return counts;
  }, [pastPuzzles]);

  return (
    <div className="mt-4">
      <h3 className="text-gray-500 text-xs pb-2 mb-2 border-b-[1px] border-dotted border-gray-300">
        Number of attempts in previous puzzles
      </h3>
      {/* Horizontal bars representing count of puzzles solved in x attempts */}
      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className="flex items-center">
          <div className="w-2 text-left mr-2 text-gray-600">{num}</div>
          <div
            className="bg-blue-500 h-6 flex items-center rounded-md"
            style={{
              width: `${(attemptsDistribution[num] / totalPuzzles) * 100}%`,
            }}
          >
            <span className="text-white text-xs pl-2">
              {attemptsDistribution[num]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatsCard: React.FC = () => {
  const { pastPuzzles } = useGameHistory();

  // Memoize total puzzles, win rate, and average attempts
  const { totalPuzzles, winRate, averageAttempts } = useMemo(() => {
    const total = pastPuzzles.length;

    const wins = pastPuzzles.filter(
      (puzzle) => puzzle.state === "succeeded"
    ).length;

    const avgAttempts =
      pastPuzzles.reduce((acc, puzzle) => acc + puzzle.attempts.length, 0) /
      total;

    return {
      totalPuzzles: total,
      winRate: total > 0 ? (wins / total) * 100 : 0,
      averageAttempts: total > 0 ? avgAttempts.toFixed(2) : 0,
    };
  }, [pastPuzzles]);

  return (
    <div>
      {/* Total puzzles, win rate, average attempts */}
      <div className="flex justify-between my-4">
        <div className="flex flex-col items-center">
          <p className="text-xs font-thin text-gray-500">Total Puzzles</p>
          <p className="font-bold text-xl">{totalPuzzles}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs font-thin text-gray-500">Win Rate</p>
          <p className="font-bold text-xl">{winRate.toFixed(0)}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs font-thin text-gray-500">Average Attempts</p>
          <p className="font-bold text-xl">{averageAttempts}</p>
        </div>
      </div>
      {typeof totalPuzzles === "number" && totalPuzzles > 0 && (
        <AttemptsCountsGraph totalPuzzles={totalPuzzles} />
      )}
    </div>
  );
};

export function StatsModal({
  isOpen,
  onClickClose,
}: {
  isOpen: boolean;
  onClickClose: () => void;
}) {
  return (
    <>
      <ModalComponent
        title="Game History"
        isOpen={isOpen}
        onClickClose={onClickClose}
      >
        <StatsCard />
      </ModalComponent>
    </>
  );
}
