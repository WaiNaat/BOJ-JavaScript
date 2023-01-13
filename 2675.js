const repeat = (count, string) => {
  const result = [];
  string.split('').forEach((char) => {
    for (let i = 0; i < count; i += 1) result.push(char);
  });
  return result.join('');
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [T, ...tests] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' '));

const sol = tests.map(([R, S]) => repeat(Number(R), S));

console.log(sol.join('\n'));
