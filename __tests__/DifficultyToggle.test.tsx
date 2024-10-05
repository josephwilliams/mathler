// __tests__/DifficultyToggle.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BoardProvider } from "../contexts/BoardContext";
import { GameHistoryProvider } from "../contexts/GameHistoryContext";
import DifficultyToggle from "../components/DifficultyToggle";

// Mock GameHistoryContext
jest.mock("../contexts/GameHistoryContext", () => ({
  useGameHistory: () => ({
    currentPuzzle: {
      targetNumber: 12,
      solutionEquation: "1+5*2",
      state: "ongoing", // The game is in progress, not idle
      attempts: ["1+5*2"],
    },
  }),
}));

describe("DifficultyToggle Component", () => {
  it("should disable difficulty select when the game is not in idle state", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <DifficultyToggle />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Select should be disabled mid-game (state is 'ongoing')
    const difficultySelect = screen.getByRole("combobox");
    expect(difficultySelect).toBeDisabled();
  });

  it("should enable difficulty select when the game is in idle state", () => {
    // Mock the game state to be 'idle'
    jest.mock("../contexts/GameHistoryContext", () => ({
      useGameHistory: () => ({
        currentPuzzle: {
          targetNumber: 12,
          solutionEquation: "1+5*2",
          state: "idle", // Game is idle
          attempts: [],
        },
      }),
    }));

    render(
      <GameHistoryProvider>
        <BoardProvider>
          <DifficultyToggle />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Select should be enabled when the game is idle
    const difficultySelect = screen.getByRole("combobox") as HTMLSelectElement;
    expect(difficultySelect).not.toBeDisabled();

    // Test that changing difficulty works when idle
    fireEvent.change(difficultySelect, { target: { value: "hard" } });
    expect(difficultySelect.value).toBe("hard");
  });
});
