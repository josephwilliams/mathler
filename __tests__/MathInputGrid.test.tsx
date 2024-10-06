import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MathInputGrid from "../components/InputGrid";
import { BoardProvider } from "../contexts/BoardContext";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";
import Board from "@/components/Board";

describe("MathInputGrid", () => {
  it("renders number buttons", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <MathInputGrid />
        </BoardProvider>
      </GameHistoryProvider>
    );

    // numbers
    expect(screen.getByTestId("input-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-2")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-3")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-4")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-5")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-6")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-7")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-8")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-9")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-0")).toBeInTheDocument();

    // operators
    expect(screen.getByTestId("input-button-+")).toBeInTheDocument();
    expect(screen.getByTestId("input-button--")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-*")).toBeInTheDocument();
    expect(screen.getByTestId("input-button-/")).toBeInTheDocument();

    // buttons
    expect(screen.getByTestId("input-grid-submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("input-grid-delete-button")).toBeInTheDocument();
  });

  it("responds to button clicks", () => {
    render(
      <GameHistoryProvider>
        <BoardProvider>
          <Board />
          <MathInputGrid />
        </BoardProvider>
      </GameHistoryProvider>
    );

    fireEvent.click(screen.getByTestId("input-button-1"));
    fireEvent.click(screen.getByTestId("input-button-+"));

    // test that the tile value is added
    expect(screen.getByTestId("board-row-0").textContent).toContain("1");
    expect(screen.getByTestId("board-row-0").textContent).toContain("+");
  });
});
