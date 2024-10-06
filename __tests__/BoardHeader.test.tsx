import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatsOpenerBubble, TitleBubble } from "@/components/BoardHeader";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";

jest.mock("../components/Modal", () => ({
  __esModule: true,
  default: jest.fn(({ title, isOpen, onClickClose, children }) => (
    <>
      {isOpen && (
        <div data-testid="modal">
          <h2>{title}</h2>
          <button onClick={onClickClose}>Close</button>
          {children}
        </div>
      )}
    </>
  )),
}));

describe("TitleBubble Component", () => {
  it("renders the title and subtitle", () => {
    render(<TitleBubble />);

    expect(screen.getByText("Mathler")).toBeInTheDocument();
    expect(screen.getByText("For Dynamic, by Joseph.")).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    render(<TitleBubble />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/josephwilliams/mathler"
    );
  });
});

describe("StatsOpenerBubble Component", () => {
  it("renders the stats opener button", () => {
    render(
      <GameHistoryProvider>
        <StatsOpenerBubble />
      </GameHistoryProvider>
    );

    const button = screen.getByTestId("stats-modal-opener");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Stats");
  });

  it("opens the StatsModal when clicked", () => {
    render(
      <GameHistoryProvider>
        <StatsOpenerBubble />
      </GameHistoryProvider>
    );

    const button = screen.getByTestId("stats-modal-opener");
    fireEvent.click(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
});
