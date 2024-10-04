import ModalComponent from "./Modal";
import { useGameHistory } from "@/contexts/GameHistoryContext";

export function StatsModal({
  isOpen,
  onClickClose,
}: {
  isOpen: boolean;
  onClickClose: () => void;
}) {
  const { currentPuzzle } = useGameHistory();
  console.log("> currentPuzzle", currentPuzzle);

  return (
    <>
      <ModalComponent
        title="Game History"
        isOpen={isOpen}
        onClickClose={onClickClose}
      >
        stats!
      </ModalComponent>
    </>
  );
}
