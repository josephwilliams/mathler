import { useEffect, useState } from "react";
import DifficultyToggle from "./DifficultyToggle";
import { useGameHistory } from "@/contexts/GameHistoryContext";
import ModalComponent from "./Modal";
import { StatsCard, StatsModal } from "./StatsModal";
import ConfettiExplosion from "react-confetti-explosion";
import Link from "next/link";

function TitleBubble() {
  return (
    <div className="bg-white shadow-lg px-2 py-1 rounded-md flex gap-1 flex-1">
      <div className=" flex flex-col justify-center flex-1">
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
        <h2 className="pl-1 text-xs text-gray-400">For Dynamic, by Joseph.</h2>
      </div>
      <Link
        className="flex items-end text-gray-400"
        href="https://github.com/josephwilliams/mathler"
        target="_blank"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
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
        data-testid="stats-modal-opener"
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
        className="rounded-md p-3 flex justify-center items-center font-bold bg-green-600 hover:bg-green-500 transition-colors text-white"
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
            <div className="flex flex-col justify-center pl-0 py-3 pb-3 gap-1">
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
            <div className="flex flex-col justify-center pl-0 py-3 pb-3 gap-1">
              <div className="text-lg">😭 You failed!</div>
              <div className="text-xs">The Solution:</div>
              <div className="text-md font-bold bg-gray-100 p-2 py-1 rounded-md">
                {currentPuzzle.solutionEquation}
              </div>
            </div>
          )}
        </div>
        <StatsCard includeCurrentPuzzle />
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
