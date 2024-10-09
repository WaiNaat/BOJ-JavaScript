/*
단순 dp로 하기에는 행에서 이동방향이 불분명함
그러면 이동방향별로 dp를 계산하면 되는거아님?

opt(r, c, fromLeft/fromRight):= (r,c)까지 도착하는데 얻는 최대가치, 단 같은행에서는 본인 왼쪽 또는 오른쪽에서 온거임
value(r, c):= (r,c)칸의 가치
opt(r, c, fromLeft) = value(r,c) + max(
  opt(r-1, c, fromLeft),
  opt(r-1, c, fromRight),
  opt(r, c-1, fromLeft),
)
fromRight 는 세 번째를 opt(r, c+1, fromRight) 로 바꾸면 됨
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...values] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// 첫 행은 무조건 오른쪽진행
let cur = values[0].reduce((result, value) => {
  result.push((result.at(-1) ?? 0) + value);
  return result;
}, []);

for (let r = 1; r < row; r += 1) {
  const nextFromLeft = Array.from(cur);
  const nextFromRight = Array.from(cur);

  for (let c = 0; c < col; c += 1) {
    nextFromLeft[c] = Math.max(nextFromLeft[c], nextFromLeft[c - 1] ?? -Infinity) + values[r][c];
  }
  for (let c = col - 1; c >= 0; c -= 1) {
    nextFromRight[c] = Math.max(nextFromRight[c], nextFromRight[c + 1] ?? -Infinity) + values[r][c];
  }

  cur = Array.from({ length: col }, (_, c) => Math.max(nextFromLeft[c], nextFromRight[c]));
}

console.log(cur.at(-1));
