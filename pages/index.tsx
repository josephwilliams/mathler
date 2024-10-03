import Link from "next/link";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";
import { BoardProvider } from "@/contexts/BoardContext";
import InputGrid from "@/components/InputGrid";
import Board from "@/components/Board";
import BoardHeader from "@/components/BoardHeader";

export default function Home() {
  return (
    <GameHistoryProvider>
      <BoardProvider>
        <div className="flex flex-col justify-center items-center p-3 m-0-auto min-h-screen gap-3">
          <BoardHeader />
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
