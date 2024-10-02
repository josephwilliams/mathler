export function generateRandomEquationWithCumulativeSolutions(target) {
  const operators = ["+", "-", "*", "/"];
  const maxNumber = 10; // Adjust the range of numbers here
  const equation = [];
  let currentTotal = target;

  // Generate random equation
  for (let i = 0; i < 5; i++) {
    const randomOperator =
      operators[Math.floor(Math.random() * operators.length)];
    const randomValue = Math.floor(Math.random() * maxNumber) + 1;

    // Depending on the operator, adjust the current total in reverse to ensure the equation evaluates to target
    switch (randomOperator) {
      case "+":
        currentTotal -= randomValue;
        break;
      case "-":
        currentTotal += randomValue;
        break;
      case "*":
        if (currentTotal % randomValue === 0) {
          currentTotal /= randomValue;
        } else {
          continue;
        }
        break;
      case "/":
        currentTotal *= randomValue;
        break;
      default:
        break;
    }

    // Add the value and operator to the equation
    equation.push(randomValue, randomOperator);
  }

  // Add the final number to balance the equation
  equation.push(currentTotal);

  return {
    primarySolution: equation,
    // Find cumulative solutions by re-arranging the equation
    cumulativeSolutions: findCumulativeSolutions(equation),
  };
}

// Helper function to generate all permutations of the equation that still result in the same value
function findCumulativeSolutions(equation) {
  const solutions = new Set(); // Using a Set to avoid duplicates

  const numbers = [];
  const operators = [];

  // Separate numbers and operators
  equation.forEach((item, index) => {
    if (index % 2 === 0) {
      numbers.push(item);
    } else {
      operators.push(item);
    }
  });

  // Generate all possible permutations of numbers and apply operators
  const permutedNumbers = permute(numbers);
  permutedNumbers.forEach((perm) => {
    let result = perm[0];
    let equationString = `${perm[0]}`;
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const number = perm[i + 1];
      equationString += ` ${operator} ${number}`;

      switch (operator) {
        case "+":
          result += number;
          break;
        case "-":
          result -= number;
          break;
        case "*":
          result *= number;
          break;
        case "/":
          result /= number;
          break;
      }
    }

    if (result === eval(equation.join(""))) {
      solutions.add(equationString);
    }
  });

  return Array.from(solutions);
}

// Helper function to generate permutations
function permute(arr) {
  if (arr.length <= 1) return [arr];

  const permutations = [];
  for (let i = 0; i < arr.length; i++) {
    const currentNum = arr[i];
    const remainingNums = arr.slice(0, i).concat(arr.slice(i + 1));
    const remainingPerms = permute(remainingNums);
    remainingPerms.forEach((perm) => {
      permutations.push([currentNum].concat(perm));
    });
  }

  return permutations;
}
