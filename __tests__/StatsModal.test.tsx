import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatsModal } from "../components/StatsModal";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";

// This is required as the modal is not set to an app element
// in the testing env like it is in NextJS.
jest.mock("../components/Modal", () => ({
  __esModule: true,
  default: jest.fn(({ title, isOpen, onClickClose, children }) => (
    <>
      {isOpen && (
        <div>
          <h2>{title}</h2>
          <button data-testid="modal-close-button" onClick={onClickClose}>
            Close
          </button>
          {children}
        </div>
      )}
    </>
  )),
}));

// These tests are for the StatsModal component but sort of
// work as general modal tests as well.

describe("StatsModal Component", () => {
  it("renders the StatsModal when open", () => {
    render(
      <GameHistoryProvider>
        <StatsModal isOpen={true} onClickClose={() => {}} />
      </GameHistoryProvider>
    );

    // Ensure that the title and content are rendered
    expect(screen.getByText("Game History")).toBeInTheDocument();
  });

  it("does not render the modal content when closed", () => {
    render(
      <GameHistoryProvider>
        <StatsModal isOpen={false} onClickClose={() => {}} />
      </GameHistoryProvider>
    );

    // Ensure that the modal is not visible
    expect(screen.queryByText("Game History")).not.toBeInTheDocument();
  });

  it("calls onClickClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <GameHistoryProvider>
        <StatsModal isOpen={true} onClickClose={handleClose} />
      </GameHistoryProvider>
    );

    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
