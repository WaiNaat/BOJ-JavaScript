/*
누가봐도 dp

opt(i, switch) := i번째 점수이고 i-2초에 스위치를 눌렀는지 여부에 따른 최댓값
score(i) := i번째 얻는 점수

opt(i, on) =
  (score(i) + score(i-1) + score(i-2)) * 2
  max(opt(i-3, on), opt(i-3, off))
opt(i, off) =
  max(opt(i-1, on), opt(i-1, off)) + score(i)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...score] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const on = [];
const off = [];
score.push(0, 0);

for (let i = 0; i < score.length; i += 1) {
  off.push(Math.max(on[i - 1] ?? 0, off[i - 1] ?? 0) + score[i]);

  on.push(
    i >= 2
      ? (score[i] + (score[i - 1] ?? 0) + (score[i - 2] ?? 0)) * 2 +
          Math.max(on[i - 3] ?? 0, off[i - 3] ?? 0)
      : off[i],
  );
}

console.log(Math.max(on.at(-1), off.at(-1)));
