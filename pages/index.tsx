import Link from "next/link";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";
import { BoardProvider } from "@/contexts/BoardContext";
import InputGrid from "@/components/InputGrid";
import Board from "@/components/Board";

export default function Home() {
  return (
    <GameHistoryProvider>
      <BoardProvider>
        <div className="flex flex-col justify-center items-center p-3 m-0-auto min-h-screen max-h-screen">
          <h1>Mathler. For Dynamic, by Joseph.</h1>

          <Board />
          <InputGrid />

          <Link
            className="text-[12px] mt-3 underline decoration-dotted text-[#386e39] flex items-center"
            href="https://github.com/josephwilliams/"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </BoardProvider>
    </GameHistoryProvider>
  );
}
