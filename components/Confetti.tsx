import { useGameHistory } from "@/contexts/GameHistoryContext";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const GameResultConfetti: React.FC = () => {
  const { currentPuzzle } = useGameHistory();

  useEffect(() => {
    if (currentPuzzle?.state === "succeeded") {
      setIsCelebrating(true);
      setTimeout(() => {
        setIsCelebrating(false);
      }, 8000);
    }
  }, [currentPuzzle?.state]);

  const [isCelebrating, setIsCelebrating] = useState(false);

  return <>{isCelebrating && <Confetti />}</>;
};

export default GameResultConfetti;
