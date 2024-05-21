/*
코드2: 이중for문 안에있으므로 n^2
코드1: 이건 해봐야겠는데

2 1
1 1

6 3 1 
3 2 1
1 1 1

20 10 4 1
10 6 3 1
4 3 2 1
1 1 1 1

70 35 15 5 1
35 20 10 4 1
15 10 6 3 1
5 4 3 2 1
1 1 1 1 1

오른쪽 아래에서부터 시작하고
왼쪽이랑 위쪽을 본인이 불린만큼 부름
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [n] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n').map(Number);

const counts = Array.from({ length: n + 1 }).map(() => Array.from({ length: n + 1 }).fill(0));
counts[0][0] = 1;
for (let r = 0; r <= n; r += 1) {
  for (let c = 0; c <= n; c += 1) {
    if (r < n) {
      counts[r + 1][c] += counts[r][c];
    }
    if (c < n) {
      counts[r][c + 1] += counts[r][c];
    }
  }
}

console.log(counts[n][n], n ** 2);
