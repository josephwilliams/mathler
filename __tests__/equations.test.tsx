import { generateRandomEquationWithLength } from "../lib/equations";
import { evaluate } from "mathjs";

describe("generateRandomEquationWithLength", () => {
  it("should generate an equation with a valid integer target value", () => {
    const { equation, targetValue } = generateRandomEquationWithLength(6);

    // Ensure the result is an integer
    expect(Number.isInteger(targetValue)).toBe(true);

    // Ensure that the equation evaluates to the same targetValue using mathjs
    const result = evaluate(equation);
    expect(result).toBe(targetValue);
  });

  it("should generate an equation of the correct length", () => {
    const length = 6;
    const { equation } = generateRandomEquationWithLength(length);

    // Ensure the generated equation matches the expected length
    expect(equation.length).toBe(length);
  });

  it("should contain valid operators and numbers", () => {
    const { equation } = generateRandomEquationWithLength(6);

    // Check that the equation contains only valid characters (digits and operators)
    const validChars = /^[0-9+\-*/]+$/;
    expect(validChars.test(equation)).toBe(true);
  });
});
