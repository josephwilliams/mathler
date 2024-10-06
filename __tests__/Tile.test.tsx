import React from "react";
import { render, screen } from "@testing-library/react";
import Tile from "../components/Tile";

describe("Tile Component", () => {
  it("renders the tile with the correct value", () => {
    render(
      <Tile
        tileValue="5"
        isCompletedRow={false}
        isCorrectlyPlacedValue={false}
        isValueInSolution={false}
        isActiveTile={false}
      />
    );
    const tile = screen.getByTestId("tile-5");
    expect(tile).toHaveTextContent("5");
  });

  it("applies correct styles for an incomplete row", () => {
    render(
      <Tile
        tileValue="7"
        isCompletedRow={false}
        isCorrectlyPlacedValue={false}
        isValueInSolution={false}
        isActiveTile={false}
      />
    );
    const tile = screen.getByTestId("tile-7");
    expect(tile).toHaveClass("bg-gray-100 text-black");
  });

  it("applies correct styles for a correctly placed value in a completed row", () => {
    render(
      <Tile
        tileValue="9"
        isCompletedRow={true}
        isCorrectlyPlacedValue={true}
        isValueInSolution={true}
        isActiveTile={false}
      />
    );
    const tile = screen.getByTestId("tile-9");
    expect(tile).toHaveClass("bg-green-500 text-white");
  });

  it("applies correct styles for a value that is in the solution but incorrectly placed", () => {
    render(
      <Tile
        tileValue="2"
        isCompletedRow={true}
        isCorrectlyPlacedValue={false}
        isValueInSolution={true}
        isActiveTile={false}
      />
    );
    const tile = screen.getByTestId("tile-2");
    expect(tile).toHaveClass("bg-yellow-400 text-black");
  });

  it("applies correct styles for a value that is not in the solution", () => {
    render(
      <Tile
        tileValue="8"
        isCompletedRow={true}
        isCorrectlyPlacedValue={false}
        isValueInSolution={false}
        isActiveTile={false}
      />
    );
    const tile = screen.getByTestId("tile-8");
    expect(tile).toHaveClass("bg-gray-400");
  });

  it("applies bounce animation for the active tile", () => {
    render(
      <Tile
        tileValue="4"
        isCompletedRow={false}
        isCorrectlyPlacedValue={false}
        isValueInSolution={false}
        isActiveTile={true}
      />
    );
    const tile = screen.getByTestId("tile-4");
    expect(tile).toHaveClass("animate-bounce");
  });
});
