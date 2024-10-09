/*
컴퓨터 1000대 * 로그 10000개 -> 천만
그냥 완탐 ㄱ
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, infectedComputers, ...logs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

infectedComputers.sort((a, b) => a - b);
logs.sort((a, b) => a[0] - b[0]);

const target = infectedComputers.join(' ');
let sol;

for (const candidate of infectedComputers) {
  const infected = new Set([candidate]);

  logs.forEach(([, start, end]) => {
    if (infected.has(start)) {
      infected.add(end);
    }
  });

  const infectectedFromThisTestcase = Array.from(infected)
    .sort((a, b) => a - b)
    .join(' ');

  if (target === infectectedFromThisTestcase) {
    sol = candidate;
    break;
  }
}

console.log(sol);
