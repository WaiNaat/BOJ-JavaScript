const isRightTriangle = (sides) => {
  sides.sort((a, b) => a - b);
  const [short1, short2, long] = sides;
  if (short1 ** 2 + short2 ** 2 === long ** 2) return true;
  return false;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const triangles = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

triangles.pop();

// process
const sol = [];
triangles.forEach((sides) => {
  sol.push(isRightTriangle(sides) ? 'right' : 'wrong');
});

// output
console.log(sol.join('\n'));
