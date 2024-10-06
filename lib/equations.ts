import { simplify, evaluate } from "mathjs";

export function generateRandomEquationWithLength(length) {
  const operators = ["+", "-", "*", "/"];
  let equation = "";

  // Ensure first character is a number (1 to 999)
  let randomValue = Math.floor(Math.random() * 999) + 1;
  equation += randomValue;

  // Generate random equation of specified length
  while (equation.length < length) {
    const randomOperator =
      operators[Math.floor(Math.random() * operators.length)];

    // Ensure the equation still has room for both operator and number
    if (equation.length + 2 > length) {
      break;
    }

    equation += randomOperator;

    const remainingLength = length - equation.length;

    // Decide if the next number should be one, two, or three digits based on the remaining length
    if (remainingLength > 2) {
      randomValue = Math.floor(Math.random() * 999) + 1; // Up to 3-digit number
    } else if (remainingLength > 1) {
      randomValue = Math.floor(Math.random() * 90) + 10; // Two-digit number
    } else {
      randomValue = Math.floor(Math.random() * 9) + 1; // Single-digit number
    }

    equation += randomValue;
  }

  // Use mathjs to safely evaluate the equation with proper operator precedence
  const targetValue = evaluate(equation);

  return {
    equation,
    targetValue,
  };
}

// This function checks if a solution is a cumulative solution
// For example, if the primary solution is "3 + 4 - 1", then "4 + 3 - 1" is a cumulative solution
export function isCumulativeSolution(
  solution: string,
  potentialAlternative: string
): boolean {
  if (solution === potentialAlternative) {
    return true;
  }

  // Helper to split a string into numbers and operators
  const tokenize = (
    expr: string
  ): { numbers: string[]; operators: string[] } => {
    const numbers = expr.split(/[+\-*/]/).filter(Boolean); // Get numbers
    const operators = expr.split(/\d+/).filter(Boolean); // Get operators
    return { numbers, operators };
  };

  const solutionTokens = tokenize(solution);
  const alternativeTokens = tokenize(potentialAlternative);

  // Check if both have the same set of numbers (regardless of order)
  const solutionNumbers = [...solutionTokens.numbers].sort();
  const alternativeNumbers = [...alternativeTokens.numbers].sort();
  if (solutionNumbers.join("") !== alternativeNumbers.join("")) {
    return false;
  }

  // Evaluate and simplify both expressions to check for mathematical equivalence.
  // The simplify function should deterministically order the numbers and operators.
  try {
    const simplifiedSolution = simplify(solution).toString();
    const simplifiedAlternative = simplify(potentialAlternative).toString();
    return simplifiedSolution === simplifiedAlternative;
  } catch (error) {
    console.error("Error simplifying expressions:", error);
    return false;
  }
}
