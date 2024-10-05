import { GameHistoryProvider } from "@/contexts/GameHistoryContext";
import { BoardProvider } from "@/contexts/BoardContext";
import InputGrid from "@/components/InputGrid";
import Board from "@/components/Board";
import BoardHeader from "@/components/BoardHeader";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <GameHistoryProvider>
        <BoardProvider>
          <div className="flex flex-col justify-center items-center p-3 m-0-auto w-[390px] gap-3 overflow-x-hidden overflow-y-auto pb-8">
            <BoardHeader />
            <Board />
            <InputGrid />
          </div>
        </BoardProvider>
      </GameHistoryProvider>
    </ClientOnly>
  );
}
