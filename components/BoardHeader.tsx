import { useEffect, useState } from "react";
import DifficultyToggle from "./DifficultyToggle";
import { useGameHistory } from "@/contexts/GameHistoryContext";
import ModalComponent from "./Modal";
import { StatsCard, StatsModal } from "./StatsModal";
import ConfettiExplosion from "react-confetti-explosion";

function TitleBubble() {
  return (
    <div className="bg-white shadow-lg px-2 py-1 rounded-md flex flex-col justify-center flex-1">
      <h1 className="flex items-center text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
          />
        </svg>
        Mathler
      </h1>
      <h2 className="text-xs text-gray-400">For Dynamic, by Joseph.</h2>
    </div>
  );
}

function StatsOpenerBubble() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white shadow-lg p-2 px-3 rounded-md flex flex-col justify-between"
      >
        <div className="text-xs font-medium text-gray-400">Stats</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
      </button>
      <StatsModal isOpen={isOpen} onClickClose={() => setIsOpen(false)} />
    </>
  );
}

export function PlayAgainButtonBubble() {
  const { generateNewPuzzle } = useGameHistory();
  return (
    <div className="bg-white shadow-lg p-2 rounded-md flex flex-col justify-between">
      <button
        onClick={generateNewPuzzle}
        className="rounded-md p-3 flex justify-center items-center font-bold bg-green-600 text-white"
      >
        Play Again!
      </button>
    </div>
  );
}

export function ResultBubble() {
  const { currentPuzzle } = useGameHistory();

  const succeeded = currentPuzzle?.state === "succeeded";
  const failed = currentPuzzle?.state === "failed";
  const tries = currentPuzzle?.attempts.length;

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (succeeded || failed) {
      setIsOpen(true);
    }
  }, [succeeded, failed]);

  return (
    <>
      <ModalComponent
        title="Game Result"
        isOpen={isOpen}
        onClickClose={() => setIsOpen(false)}
      >
        <div className="border-b-[1px] border-dotted border-gray-300 mb-3">
          {succeeded && (
            <div className="flex flex-col justify-center pl-0 px-8 py-3 pb-3 gap-1">
              <div className="flex items-center justify-center">
                <ConfettiExplosion />
              </div>

              <div className="text-lg">🎉 Congratulations!</div>
              <div className="text-sm text-gray-500 py-1">
                {`You solved the puzzle in ${tries} tries.`}
              </div>
              <div className="text-xs">The Solution:</div>
              <div className="text-md font-bold bg-gray-100 p-2 py-1 rounded-md">
                {currentPuzzle.solutionEquation}
              </div>
            </div>
          )}
          {failed && (
            <div className="flex flex-col justify-center pl-0 px-8 py-3 pb-3 gap-1">
              <div className="text-lg">😭 You failed!</div>
              <div className="text-xs">The Solution:</div>
              <div className="text-md font-bold bg-gray-100 p-2 py-1 rounded-md">
                {currentPuzzle.solutionEquation}
              </div>
            </div>
          )}
        </div>
        <StatsCard />
      </ModalComponent>
      {(succeeded || failed) && <PlayAgainButtonBubble />}
    </>
  );
}

export default function BoardHeader() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2">
        <TitleBubble />
        <StatsOpenerBubble />
        <DifficultyToggle />
      </div>
      <ResultBubble />
    </div>
  );
}
