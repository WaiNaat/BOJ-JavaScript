/*
물은 낮은 번호 -> 높은 번호로만 흐름
내가 받는 물의 양은 내 위쪽 번호들이 다 계산되면 알 수 있음

opt(i) := i번 양동이가 받는 물의 양
children(i) := i번 양동이가 물을 보내주는 애들의 수

opt(i) = sum(opt(k) / children(k)) (단, k는 i에게 물을 보내주는 양동이)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[bucketCount], ...hose] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const water = new Array(bucketCount + 1).fill(0);
const children = new Array(bucketCount + 1).fill(0);
const parents = Array.from(new Array(bucketCount + 1), () => []);

hose.forEach(([from, to]) => {
  children[from] += 1;
  parents[to].push(from);
});

water[1] = 100;

for (let bucket = 1; bucket <= bucketCount; bucket += 1) {
  parents[bucket].forEach((parent) => {
    water[bucket] += water[parent] / children[parent];
  });
}

const maxWater = water.reduce((prev, cur, index) => {
  if (children[index] === 0 && prev < cur) return cur;
  return prev;
}, 0);

console.log(maxWater);
