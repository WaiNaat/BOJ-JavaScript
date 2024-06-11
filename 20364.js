/*
1번에서 원하는 땅 찾아가기보다 원하는 땅에서 1번 찾아가기가 더 쉬움
거꾸로 찾아가면서 만나는 가장 마지막 점유된 땅을 구하면 됨

거꾸로 찾는 시간 logN
오리의 수 Q
-> QlogN
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [landCount, , ...wanted] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const hasOwner = Array.from({ length: landCount + 1 });
const sol = [];
wanted.forEach((target) => {
  let owner = 0;
  for (let current = target; current >= 1; current = Math.floor(current / 2)) {
    if (hasOwner[current]) {
      owner = current;
    }
  }

  if (owner === 0) {
    hasOwner[target] = true;
  }

  sol.push(owner);
});

console.log(sol.join('\n'));
