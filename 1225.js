const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [one, another] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map((value) => [...value]);

let sol = 0;

one.forEach((oneValue) => {
  another.forEach((anotherValue) => {
    sol += Number(oneValue) * Number(anotherValue);
  });
});

console.log(sol);
