/*
소수점 계산은 귀찮으니까
'그녀' 4만 명을 만들어서 시뮬레이션 돌리면 될듯?
  (매장은 4개에 첫 방문지 확률이 0.25로 균등하므로 매장별로 1만명씩 넣어둠)
시뮬은 최대 10번만 돌아가고 매장은 4개라 금방함
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[time], , ...lines] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .replaceAll('A', '0')
  .replaceAll('B', '1')
  .replaceAll('C', '2')
  .replaceAll('D', '3')
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: 4 }, () => []);
lines.forEach(([start, end, prob]) => {
  next[start].push([end, prob]);
});

const initialCount = 10000;
let counts = Array.from({ length: 4 }, () => initialCount);

for (let t = 0; t < time; t += 1) {
  const nextCounts = Array.from({ length: 4 }, () => 0);
  for (let cur = 0; cur < 4; cur += 1) {
    next[cur].forEach(([area, prob]) => {
      nextCounts[area] += counts[cur] * prob;
    });
  }
  counts = nextCounts;
}

console.log(counts.map((count) => ((count * 100) / (initialCount * 4)).toFixed(2)).join('\n'));
