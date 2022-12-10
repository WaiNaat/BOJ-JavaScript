/*
같은 방향이 두 번 나오면 거기가 밭에서 움푹 패인 부분
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[K], ...sides] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let sol;
for (let i = 0; i < 6; i += 1) {
  if (
    sides[i][0] === sides[(i + 2) % 6][0]
    && sides[(i + 1) % 6][0] === sides[(i + 3) % 6][0]
  ) {
    sol = (
      (sides[i][1] + sides[(i + 2) % 6][1]) * (sides[(i + 1) % 6][1] + sides[(i + 3) % 6][1])
      - (sides[(i + 1) % 6][1] * sides[(i + 2) % 6][1])
    );
    break;
  }
}
sol *= K;

// output
console.log(sol);
