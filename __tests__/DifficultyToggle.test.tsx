import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DifficultyToggle from "../components/DifficultyToggle";
import { BoardProvider } from "../contexts/BoardContext";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";

describe("DifficultyToggle Component", () => {
  it("should render the toggle button correctly", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <DifficultyToggle />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // Check if the button is rendered
    const toggleButton = screen.getByTestId("difficulty-toggle");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Normal");
  });

  it("should switch to hard mode when clicked", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <DifficultyToggle />
        </BoardProvider>
      </GameHistoryProvider>
    );

    const toggleButton = screen.getByTestId("difficulty-toggle");

    // Click the toggle to switch to hard mode
    fireEvent.click(toggleButton);

    // Ensure the button text updates to reflect hard mode
    expect(toggleButton).toHaveTextContent("Hard");
  });

  it("should toggle back to regular mode when clicked again", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <DifficultyToggle />
        </BoardProvider>
      </GameHistoryProvider>
    );

    const toggleButton = screen.getByTestId("difficulty-toggle");

    // Switch to hard mode
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Hard");

    // Switch back to regular mode
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Normal");
  });
});
