import { simplify, evaluate } from "mathjs";

// NOTE: This is not a true "random" equation generator, as certain concessions
// are made to ensure that the computation doesn't hang while continuously
// regenerating itself to find a valid target value. This function does, however,
// generate psuedo-random equations that are generally humanly solvable (i.e.
// not overly complex or overly large numbers), with a valid integer target value,
// and with opportunities for cumulative solutions (since there's often multiple operators).
export function generateRandomEquationWithLength(length) {
  const operators = ["+", "-", "*", "/"];
  let equation = "";

  // Generate the first number (1 or 2 digits)
  const firstNumber =
    Math.random() < 0.5
      ? Math.floor(Math.random() * 9) + 1
      : Math.floor(Math.random() * 90) + 10;
  equation += firstNumber;

  // Add an operator
  const randomOperator =
    operators[Math.floor(Math.random() * operators.length)];
  equation += randomOperator;

  // Remaining length after the first number and operator
  const remainingLength = length - equation.length;

  // Decide whether to add a 3-digit number or more complexity
  if (remainingLength === 3) {
    // Add a 3-digit number
    const threeDigitNumber = Math.floor(Math.random() * 900) + 100; // Random 3-digit number
    equation += threeDigitNumber;
  } else {
    // Add a combination of numbers and an operator to create complexity
    const secondNumber = Math.floor(Math.random() * 90) + 10; // 2-digit number
    const secondOperator =
      operators[Math.floor(Math.random() * operators.length)];
    const thirdNumber = Math.floor(Math.random() * 9) + 1; // 1-digit number

    equation += secondNumber + secondOperator + thirdNumber;
  }

  // Although technically possible to generate a target value with a decimal,
  // that would be a bad user experience, so we'll only allow integer target values.
  let targetValue;
  try {
    targetValue = evaluate(equation);
    if (!Number.isInteger(targetValue)) {
      // If the result is not an integer, regenerate the equation
      return generateRandomEquationWithLength(length);
    }
  } catch (error) {
    // In case of any mathjs errors, regenerate the equation
    return generateRandomEquationWithLength(length);
  }

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
