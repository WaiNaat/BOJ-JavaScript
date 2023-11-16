/*
가장 높은 탑이 옆에걸 흡수하기
흡수는 본인 양옆에걸 하기 때문에 멀리있는 블롭을 '전달'하는건 불가
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...towers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let sol = 0;

for (let i = 0; i < towers.length; i += 1) {
  const height = towers[i] + Math.min(towers[i - 1] ?? 0, towers[i + 1] ?? 0);
  sol = Math.max(height, sol);
}

console.log(sol);
