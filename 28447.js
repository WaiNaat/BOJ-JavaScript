/*
재료가 10종류라 조합 가능
넣는다/안넣는다의 두 가지 경우이므로 이진법 사용
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[ingredientCount, pickCount], ...scores] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let sol = -Infinity;

for (let i = 1; i < 2 ** ingredientCount; i += 1) {
  const picked = [...i.toString(2).padStart(ingredientCount, '0')]
    .map((value, index) => [value, index])
    .filter(([value]) => value === '1')
    .map(([, index]) => index);

  if (picked.length !== pickCount) continue;

  let taste = 0;

  for (let one = 0; one < picked.length; one += 1) {
    for (let another = one + 1; another < picked.length; another += 1) {
      taste += scores[picked[one]][picked[another]];
    }
  }

  sol = Math.max(taste, sol);
}

console.log(sol);
