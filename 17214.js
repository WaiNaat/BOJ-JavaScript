const LINEAR_EQUATION_FORMAT = /(-?[0-9]+)x(.*)/g;
const CONSTANT_FORMAT = /(-?[0-9]+)/g;

const parseCoefficients = (equation) => {
  let match = [...equation.matchAll(LINEAR_EQUATION_FORMAT)];
  if (match.length === 0) {
    match = [...equation.matchAll(CONSTANT_FORMAT)];
  }
  match = match[0].slice(1);

  if (match.length === 2) return { linear: Number(match[0]), constant: Number(match[1]) };
  return { linear: 0, constant: Number(match[0]) };
};

const integral = (linear, constant) => {
  const result = [];

  if (linear !== 0) {
    const coeff = linear / 2;
    if (coeff === 1) result.push('xx');
    else if (coeff === -1) result.push('-xx');
    else result.push(`${coeff}xx`);
  }

  if (constant !== 0) {
    if (result.length === 0) {
      if (constant === 1) result.push('x');
      else if (constant === -1) result.push('-x');
      else result.push(`${constant}x`);
    } else if (constant === 1) result.push('+x');
    else if (constant === -1) result.push('-x');
    else if (constant > 0) result.push(`+${constant}x`);
    else result.push(`${constant}x`);
  }

  if (result.length === 0) result.push('W');
  else result.push('+W');

  return result.join('');
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const equation = require('fs').readFileSync(INPUT_FILE).toString().trim();

// process & output
const { linear, constant } = parseCoefficients(equation);
console.log(integral(linear, constant));
