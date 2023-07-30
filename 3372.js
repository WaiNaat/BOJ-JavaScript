/*
어떤 지점을 방문하기 위해서는 위에서 오거나 왼쪽에서 와야 함
위에서 아래로, 왼쪽에서 오른쪽으로 탐색하면서 채워나가면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[size], ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const pathCounts = Array.from(new Array(size), () => new Array(size).fill(0n));
pathCounts[0][0] = 1n;

for (let r = 0; r < size; r += 1) {
  for (let c = 0; c < size; c += 1) {
    const jump = board[r][c];
    const pathCount = pathCounts[r][c];

    if (jump && c + jump < size) pathCounts[r][c + jump] += pathCount;
    if (jump && r + jump < size) pathCounts[r + jump][c] += pathCount;
  }
}

console.log(pathCounts[size - 1][size - 1].toString());
