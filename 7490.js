/*
max(N)=9니까 완전탐색하면 8^3=2^9=512로 가능
아스키 순서니까 탐색순서는 공백, 더하기, 빼기
*/
const OPERATORS = [' ', '+', '-'];

const makeEquation = (operators) => {
  const equation = [1];

  operators.forEach((operator, index) => {
    if (operator === ' ') {
      equation.push(equation.pop() * 10 + index + 2);
    } else {
      equation.push(operator);
      equation.push(index + 2);
    }
  });

  return equation;
};

const calcEquation = (operators) => {
  const equation = makeEquation(operators);

  let result = equation[0];
  let i = 1;
  while (i < equation.length) {
    if (equation[i] === '+') {
      result += equation[i + 1];
    } else {
      result -= equation[i + 1];
    }
    i += 2;
  }

  return result;
};

const equationString = (operators) => {
  const array = operators.reduce(
    (result, operator, index) => {
      result.push(operator);
      result.push(index + 2);
      return result;
    },
    [1],
  );
  return array.join('');
};

const addOperator = (depth, N, operators, solutions) => {
  if (depth === N) {
    if (calcEquation(operators) === 0) {
      solutions.push(equationString(operators));
    }
    return;
  }

  OPERATORS.forEach((operator) => {
    operators.push(operator);
    addOperator(depth + 1, N, operators, solutions);
    operators.pop();
  });
};

const findEquations = (N) => {
  const solutions = [];
  const operators = [];
  addOperator(1, N, operators, solutions);
  return solutions.join('\n');
};

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [T, ...tests] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map(Number);

// process
const sol = tests.reduce(
  (prev, N) => {
    prev.push(findEquations(N));
    return prev;
  },
  [],
);

// output
console.log(sol.join('\n\n'));
