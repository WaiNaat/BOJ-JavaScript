/*
dp
opt(x, y) := (x,y)에 도착했을 때 사진의 아름다움
opt(x, y) = max(opt(x-1, y-1), opt(x-1, y+1))
선생님이 있는 곳은 opt 값을 -1로 설정

삼각형 범위 내에 들어오는게 맞는지 계산해주는 함수를 잘 만들어야 할듯
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[height], ...teachers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const isInRange = (x, y) => {
  if (x < 0 || y < 0) return false;

  if (x <= height) {
    return y <= x;
  }
  return y <= height * 2 - x;
};

const opt = Array.from({ length: height * 2 + 1 }, () =>
  Array.from({ length: height + 1 }, () => 0),
);
teachers.forEach(([x, y]) => {
  opt[x][y] = -1;
});

for (let x = 1; x <= height * 2; x += 1) {
  for (let y = 0; isInRange(x, y); y += 1) {
    if (opt[x][y] === -1) continue;

    opt[x][y] = Math.max(
      isInRange(x - 1, y - 1) ? opt[x - 1][y - 1] : -1,
      isInRange(x - 1, y + 1) ? opt[x - 1][y + 1] : -1,
    );

    const isUnreachable = opt[x][y] === -1;
    if (!isUnreachable) {
      opt[x][y] = Math.max(opt[x][y], y);
    }
  }
}

console.log(opt[height * 2][0]);
