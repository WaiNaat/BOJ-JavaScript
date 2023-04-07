const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...testCases] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(BigInt));

const results = [];
const findWinner = (a, b, x, y) => {
  const telecomParisTech = a * b;
  const eurecom = x * y;
  if (telecomParisTech < eurecom) return 'Eurecom';
  if (telecomParisTech > eurecom) return 'TelecomParisTech';
  return 'Tie';
};

testCases.forEach((values) => {
  results.push(findWinner(...values));
});

console.log(results.join('\n'));
