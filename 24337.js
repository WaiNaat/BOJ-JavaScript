/*
일단 가장 높은 건물의 높이를 구해야 함 = max(a, b)
  왜? 사전순으로 가장 빠르게 볼려면 1 2 3 4 5 ... 이렇게 쌓아야함

가장 높은 건물은 무조건 보이니까 결국 a-1개랑 b-1개만큼 더 보면 됨
 >> 각자 1 2 3 4 순서로 개수맞춰서 쌓음

건물 총 개수를 N개만큼 채우면서 사전순으로 제일 앞서야함
  >> 만약 가희 바로 오른쪽에 1이 있으면 거기에 이어서 나머지 개수만큼 1 채움
  >> 아니면 가장 높은 건물 바로 오른쪽에 채움
  >> 나머지는 몇개? N-1-(a-1)-(b-1)

예외사항: 위에서 나머지 개수가 음수면 불가능
*/
const fillRemainder = (remainder, sol) => {
  let remainderAfterFill = remainder;
  while (remainderAfterFill > 0) {
    sol.push(1);
    remainderAfterFill -= 1;
  }
  return remainderAfterFill;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, a, b] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

// process
const sol = [];
let remainder = N - a - b + 1;

if (remainder >= 0) {
  if (a > 1) {
    remainder = fillRemainder(remainder, sol);
  }

  for (let height = 1; height < a; height += 1) {
    sol.push(height);
  }

  sol.push(Math.max(a, b));

  fillRemainder(remainder, sol);

  for (let height = b - 1; height > 0; height -= 1) {
    sol.push(height);
  }
}

// output
console.log(sol.length > 0 ? sol.join(' ') : -1);
