const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col, queryCount], ...input] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const array = input.slice(0, row);
const queries = input.slice(row);

const change = (r, c, value) => { array[r][c] = value; };

const swap = (row1, row2) => {
  const temp = array[row1];
  array[row1] = array[row2];
  array[row2] = temp;
};

const operate = (operator, i, j, k) => {
  if (operator === 0) change(i, j, k);
  else swap(i, j);
};

queries.forEach(([operator, ...args]) => operate(operator, ...args));

console.log(array.map((row) => row.join(' ')).join('\n'));
